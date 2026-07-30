import React from 'react';
import CatalogTable from '../components/catalog/CatalogTable';

export default function CatalogPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-amber-500">Studio Catalog</h1>
        <p className="text-stone-400 text-sm mt-1">Browse and filter active audio projects and mix requests</p>
      </header>

      <CatalogTable />
    </div>
  );
}