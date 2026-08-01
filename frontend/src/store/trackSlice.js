import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

const getErrorMessage = (err, fallback) => {
  const detail = err.response?.data?.detail;
  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).filter(Boolean).join(', ') || fallback;
  }
  return detail || fallback;
};

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async (filters, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams(
      Object.entries(filters || {}).filter(([, value]) => value !== '' && value !== null && value !== undefined),
    ).toString();
    const response = await api.get(`/tracks/${params ? `?${params}` : ''}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, 'Error fetching tracks'));
  }
});

export const createTrack = createAsyncThunk('tracks/createTrack', async (trackData, { rejectWithValue }) => {
  try {
    const response = await api.post('/tracks/', trackData);
    return response.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, 'Failed to add music'));
  }
});

const trackSlice = createSlice({
  name: 'tracks',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTrackError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTrack.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [action.payload, ...state.items];
      })
      .addCase(createTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTrackError } = trackSlice.actions;
export default trackSlice.reducer;
