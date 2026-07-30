import { describe, it, expect } from 'vitest';
import reducer, { createTrack } from './trackSlice';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

describe('trackSlice', () => {
  it('adds a newly created track to the catalog state', () => {
    const state = reducer(initialState, {
      type: createTrack.fulfilled.type,
      payload: { id: 42, title: 'New Track', genre: 'House', bpm: 128, musical_key: 'C Maj', technical_challenge: 'test' },
    });

    expect(state.items).toEqual([
      { id: 42, title: 'New Track', genre: 'House', bpm: 128, musical_key: 'C Maj', technical_challenge: 'test' },
    ]);
  });
});