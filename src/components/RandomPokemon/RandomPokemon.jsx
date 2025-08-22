import './RandomPokemon.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RandomPokemon = () => {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const getRandomPokemon = async () => {
      try {
        const randomId = Math.floor(Math.random() * 1025) + 1; 
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

        setPokemon({
          name: res.data.name,
          pokeid: res.data.id.toString().padStart(3, '0'),
          image: res.data.sprites.other['official-artwork'].front_default, 
          types: res.data.types.map(t => t.type.name),
          height: res.data.height / 10, 
          weight: res.data.weight / 10, 
          stats: res.data.stats.map(s => ({
            name: s.stat.name,
            value: s.base_stat
          }))
        });
      } catch (error) {
        console.error("Random Pokemon download error:", error);
      }
    };

    getRandomPokemon();
  }, []);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className={`random-pokemon type-${pokemon.types[0]}`} id='random'>
      <h2 className="section-title">Pokémon of the Day</h2>
      <div className="random-pokemon-card">
        <img className="pokemon-img" src={pokemon.image} alt={pokemon.name} />
        <h3 className="pokemon-name">
          #{pokemon.pokeid} {pokemon.name}
        </h3>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span key={type} className={`type-badge ${type}`}>{type}</span>
          ))}
        </div>
        <div className="pokemon-info">
          <p><b>Height:</b> {pokemon.height} m</p>
          <p><b>Weight:</b> {pokemon.weight} kg</p>
        </div>

        <div className="random-stats">
          <h4>Statistics</h4>
          {pokemon.stats.map((stat, index) => (
            <div key={index} className="stat-row">
              <span className="stat-name">{stat.name}</span>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${stat.value > 150 ? 100 : (stat.value / 150) * 100}%` }}

                ></div>
              </div>
              <span className="stat-value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RandomPokemon;
