import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlusCircle } from 'lucide-react';
import CatalogTable from '../components/catalog/CatalogTable';

export default function CatalogPage() {
  const { user } = useSelector((state) => state.auth);
  const canAddMusic = user?.role === 'producer';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-500">Studio Catalog</h1>
          <p className="text-stone-400 text-sm mt-1">Browse and filter active audio projects and mix requests</p>
        </div>
        {canAddMusic && (
          <Link
            to="/upload"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-stone-950 transition hover:bg-amber-400"
          >
            <PlusCircle className="h-4 w-4" /> Add Music
          </Link>
        )}
      </header>

      <CatalogTable />
    </div>
  );
}
