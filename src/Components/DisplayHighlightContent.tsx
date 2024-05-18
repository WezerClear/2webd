import React from "react";
import { Link } from "react-router-dom";

interface DisplayHighlightContentProps {
  artObjects: ArtObject[];
  searchTerm: string;
  searchResults: ArtObject[];
  onSearchTermChange: (term: string) => void;
  onSearch: () => void;
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
}) => {
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
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="art-list">
            {searchResults.map((result) => (
              <Link key={result.objectID} to={`/object/${result.objectID}`}>
                <div className="art-item">
                  <h3>{result.title}</h3>
                  <img src={result.primaryImage} alt={result.title} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="art-list">
        {artObjects.map((artObject) => (
          <Link key={artObject.objectID} to={`/object/${artObject.objectID}`}>
            <div className="art-item">
              <h3>{artObject.title}</h3>
              <img src={artObject.primaryImage} alt={artObject.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DisplayHighlightContent;
