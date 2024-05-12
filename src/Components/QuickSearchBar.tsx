import React, { useState } from "react";

interface QuickSearchBarProps {
  onSearch: (
    query: string,
    options: { title?: boolean; tags?: boolean }
  ) => Promise<string[]>;
}

const QuickSearchBar: React.FC<QuickSearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchTitle, setSearchTitle] = useState(false);
  const [searchTags, setSearchTags] = useState(false);

  const handleSearch = async () => {
    const options = {
      title: searchTitle,
      tags: searchTags,
    };

    try {
      const results = await search(query, options);
      console.log("Résultats de la recherche :", results);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  const search = async (
    query: string,
    options: { title?: boolean; tags?: boolean }
  ) => {
    let queryString = `q=${encodeURIComponent(query)}`;

    if (options.title) queryString += "&title=true";
    if (options.tags) queryString += "&tags=true";

    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?${queryString}`
    );

    if (!response.ok) {
      throw new Error("La requête de recherche a échoué");
    }

    const data = await response.json();
    const objectIDs = data.objectIDs;

    return objectIDs;
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <label>
        Rechercher dans le titre :
        <input
          type="checkbox"
          checked={searchTitle}
          onChange={() => setSearchTitle(!searchTitle)}
        />
      </label>
      <label>
        Rechercher dans les balises :
        <input
          type="checkbox"
          checked={searchTags}
          onChange={() => setSearchTags(!searchTags)}
        />
      </label>
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
};

export default QuickSearchBar;
