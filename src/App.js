import { useEffect, useState } from "react";
import axios from "axios";
import PokemonThumbnails from "./components/PokemonThumbnails";
import PokemonSearchBar from "./components/PokemonSearchBar";

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    try {
      const res = await axios.get(loadMore);
      const data = await res.data;

      setLoadMore(data.next);

      async function createPokemonObject(results) {
        if (results) {
          const pokemonDataArray = [];
          for (const pokemon of results) {
            try {
              const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
              );
              const data = res.data;
              pokemonDataArray.push(data);
            } catch (error) {
              console.error("Error fetching Pokemon details:", error);
            }
          }

          pokemonDataArray.sort((a, b) => a.id - b.id);

          setAllPokemons((currentList) => [
            ...currentList,
            ...pokemonDataArray,
          ]);
        }
      }

      createPokemonObject(data.results);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
  };

  useEffect(() => {
    allPokemons.sort((a, b) => a.id - b.id);
  }, [allPokemons]);

  const handleLoadMoreClick = () => {
    getAllPokemons();
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Pokemon!</h1>
      <PokemonSearchBar setFilterValue={handleFilterChange} />
      <div className="pokemon-container">
        <div className="all-container">
          {filteredPokemons.map((pokemonStats, index) => (
            <PokemonThumbnails
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />
          ))}
        </div>
        <button className="load-more" onClick={handleLoadMoreClick}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default App;
