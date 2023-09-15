import { useEffect, useState } from "react";
import axios from "axios";
import PokemonThumbnails from "./components/PokemonThumbnails";

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    try {
      const res = await axios.get(loadMore);
      const data = await res.data;

      setLoadMore(data.next);

      function createPokemonObject(results) {
        if (results) {
          results.forEach(async (pokemon) => {
            try {
              const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
              );
              const data = res.data;

              setAllPokemons((currentList) => [...currentList, data]);
            } catch (error) {
              console.error("Error fetching Pokemon details:", error);
            }
          });
        }
      }

      createPokemonObject(data.results);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1>Pokemon</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemonStats, index) => (
            <PokemonThumbnails
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default App;
