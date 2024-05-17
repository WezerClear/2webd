import React, { useState } from 'react';

interface QuickSearchProps {
  onSearch: (query: string, options: { title?: boolean; tags?: boolean }) => Promise<string[]>;
}

const QuickSearch: React.FC<QuickSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchTitle, setSearchTitle] = useState(false);
  const [searchTags, setSearchTags] = useState(false);

  const handleSearch = async () => {
    const results = await onSearch(query, { title: searchTitle, tags: searchTags });
    console.log('Résultats de la recherche :', results);
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <label>
        Rechercher dans le titre :
        <input type="checkbox" checked={searchTitle} onChange={() => setSearchTitle(!searchTitle)} />
      </label>
      <label>
        Rechercher dans les balises :
        <input type="checkbox" checked={searchTags} onChange={() => setSearchTags(!searchTags)} />
      </label>
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
};

export default QuickSearch;
