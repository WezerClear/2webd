
//import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SearchResultsPage from './Page/SearchResultsPage';
import QuickSearchBar from './Components/QuickSearchBar';
import ObjectDetailsPage from './Page/ObjectDetailsPage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <header>
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
      { path: 'search-results', element: <SearchResultsPage results={[]} totalResults={0} searchQuery="" categories={[]} /> },
      { path: 'object/:objectId', element: <ObjectDetailsPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
function handleSearch(query: string, options: { title?: boolean | undefined; tags?: boolean | undefined; }): Promise<string[]> {
  throw new Error('Function not implemented.');
}

