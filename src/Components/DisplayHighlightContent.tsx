import React, { useState } from "react";
import { Link } from "react-router-dom";

interface DisplayHighlightContentProps {
  artObjects: ArtObject[];
  searchTerm: string;
  searchResults: ArtObject[];
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
  loading: boolean; // Ajout de l'état de chargement global
}

interface ArtObject {
  objectID: number;
  title: string;
  primaryImage: string;
}

const DisplayHighlightContent: React.FC<DisplayHighlightContentProps> = ({
  artObjects,
  searchTerm,
  searchResults,
  onSearchTermChange,
  onSearch,
  loading,
}) => {
  const [loadingImages, setLoadingImages] = useState<{ [key: number]: boolean }>({});

  const handleImageLoad = (id: number) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id: number) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  const renderPlaceholder = () => (
    <div className="art-item placeholder">
      <div className="placeholder-image"></div>
      <div className="placeholder-text"></div>
    </div>
  );

  return (
    <div className="App">
      <h1>Metropolitan Museum of Art</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
      </div>
      <div className="text-center"> {/* Wrapper pour les éléments centrés */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <h2>Search Results</h2>
            <div className="art-list">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => <div key={index}>{renderPlaceholder()}</div>)
              ) : (
                searchResults.map((result) => (
                  <Link key={result.objectID} to={`/object/${result.objectID}`}>
                    <div className="art-item">
                      <h3>{result.title}</h3>
                      {loadingImages[result.objectID] && (
                        <div className="placeholder-image">Loading...</div>
                      )}
                      <img
                        src={result.primaryImage}
                        alt={result.title}
                        onLoad={() => handleImageLoad(result.objectID)}
                        onError={() => handleImageError(result.objectID)}
                        style={{ display: loadingImages[result.objectID] ? "none" : "block" }}
                      />
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
        <div className="art-list">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => <div key={index}>{renderPlaceholder()}</div>)
          ) : (
            artObjects.map((artObject) => (
              <Link key={artObject.objectID} to={`/object/${artObject.objectID}`}>
                <div className="art-item">
                  <h3>{artObject.title}</h3>
                  {loadingImages[artObject.objectID] && (
                    <div className="placeholder-image">Loading...</div>
                  )}
                  <img
                    src={artObject.primaryImage}
                    alt={artObject.title}
                    onLoad={() => handleImageLoad(artObject.objectID)}
                    onError={() => handleImageError(artObject.objectID)}
                    style={{ display: loadingImages[artObject.objectID] ? "none" : "block" }}
                  />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayHighlightContent;
