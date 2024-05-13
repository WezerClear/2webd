import React, { useEffect, useState } from "react";
import "../App.css";

interface ArtObject {
  objectID: number;
  title: string;
  primaryImage: string;
}

const DisplayHighlight: React.FC = () => {
  const [artObjects, setArtObjects] = useState<ArtObject[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ArtObject | null>(null);

  useEffect(() => {
    const fetchArtObjects = async () => {
      try {
        const objectIDs = [100, 200, 300, 400, 500];

        const objectsData: ArtObject[] = [];
        for (const id of objectIDs) {
          const objectResponse = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
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
        setArtObjects(objectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArtObjects();
  }, []);

  const handleSearch = async () => {
    try {
      const searchResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}`
      );
      if (!searchResponse.ok) {
        throw new Error("Failed to search object");
      }
      const searchData = await searchResponse.json();
      if (searchData.objectIDs.length > 0) {
        const objectID = searchData.objectIDs[0];
        const objectResponse = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
        if (!objectResponse.ok) {
          throw new Error("Failed to fetch object");
        }
        const objectData = await objectResponse.json();
        setSearchResult({
          objectID: objectData.objectID,
          title: objectData.title,
          primaryImage: objectData.primaryImage,
        });
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Metropolitan Museum of Art</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResult && (
        <div className="search-result">
          <h2>Search Result</h2>
          <div className="art-item">
            <h3>{searchResult.title}</h3>
            <img src={searchResult.primaryImage} alt={searchResult.title} />
          </div>
        </div>
      )}
      <div className="art-list">
        {artObjects.map((artObject) => (
          <div key={artObject.objectID} className="art-item">
            <h3>{artObject.title}</h3>
            <img src={artObject.primaryImage} alt={artObject.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayHighlight;
