import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (id: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchId, setSearchId] = useState<number | "">("");

  const handleSearch = () => {
    if (searchId !== "") {
      onSearch(Number(searchId));
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by ID..."
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
