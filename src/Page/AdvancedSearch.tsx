import React, { useState } from "react";
import "../App.css";

interface ArtObject {
  objectID: number;
  title: string;
  primaryImage: string;
}

const AdvancedSearch: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [artistDisplayName, setArtistDisplayName] = useState<string>("");
  const [accessionYear, setAccessionYear] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ArtObject[]>([]);

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (title) queryParams.append("title", title);
      if (artistDisplayName) queryParams.append("artistDisplayName", artistDisplayName);
      if (accessionYear) queryParams.append("accessionYear", accessionYear);

      const searchResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${queryParams.toString()}`
      );
      if (!searchResponse.ok) {
        throw new Error("Failed to search objects");
      }
      const searchData = await searchResponse.json();
      if (searchData.objectIDs && searchData.objectIDs.length > 0) {
        const objectsData: ArtObject[] = [];
        for (const objectID of searchData.objectIDs.slice(0, 10)) {
          const objectResponse = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
          );
          if (!objectResponse.ok) {
            throw new Error("Failed to fetch object");
          }
          const objectData = await objectResponse.json();
          objectsData.push({
            objectID: objectData.objectID,
            title: objectData.title,
            primaryImage: objectData.primaryImage,
          });
        }
        setSearchResults(objectsData);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Advanced Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist Name"
          value={artistDisplayName}
          onChange={(e) => setArtistDisplayName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Accession Year"
          value={accessionYear}
          onChange={(e) => setAccessionYear(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          {searchResults.map((result) => (
            <div key={result.objectID} className="art-item">
              <h3>{result.title}</h3>
              <img src={result.primaryImage} alt={result.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
