import React from 'react';

interface SearchResult {
  category: string;
  count: number;
}

interface SearchResultsPageProps {
  results: string[];
  totalResults: number;
  searchQuery: string;
  categories: SearchResult[];
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ results, totalResults, searchQuery, categories }) => {
  return (
    <div>
      <h1>Résultats de la recherche</h1>
      <p>{totalResults} résultats pour {searchQuery}</p>
      <p>{searchQuery}</p>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category.category} ({category.count})
          </li>
        ))}
      </ul>
      <ul>
        {results.map((objectId, index) => (
          <li key={index}>{objectId}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
