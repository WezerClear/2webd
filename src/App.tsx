import React, { useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import SearchResultsPage from './Page/SearchResultsPage';
import QuickSearchBar from './Components/QuickSearchBar';

async function handleSearch(query: string, options: { title?: boolean; tags?: boolean }) {
  try {
    let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`;
    
    // Ajouter les options de recherche à l'URL si elles sont définies
    if (options.title) {
      url += '&title=true';
    }
    if (options.tags) {
      url += '&tags=true';
    }

    const response = await fetch(url);
    const data = await response.json();
    const results = data.objectIDs;

    return results; // Retourner uniquement les résultats
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    return []; // En cas d'erreur, retourner un tableau vide
  }
}


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <header>
          {/* Passer la fonction de recherche au composant QuickSearchBar */}
          <QuickSearchBar onSearch={handleSearch} />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
        </footer>
      </div>
    ),
    children: [
      { path: 'search-results', element: <SearchResultsPage results={[]} totalResults={0} searchQuery="" categories={[]} /> }, // Assurez-vous que le type des résultats est correctement spécifié
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

