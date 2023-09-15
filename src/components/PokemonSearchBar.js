import React from "react";

const PokemonSearchBar = (props) => {
  const { setFilterValue } = props;

  const handleInputChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
  };

  return (
    <div className="search-wrapper">
      <input
        className="searchbar"
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PokemonSearchBar;
