import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PokemonPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const goHome = () =>{
    navigate("/");
  }

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon({
          name: res.data.name,
          pokeid: res.data.id.toString().padStart(3, "0"),
          image: res.data.sprites.other["official-artwork"].front_default,
          types: res.data.types.map((t) => t.type.name),
          height: res.data.height / 10,
          weight: res.data.weight / 10,
          stats: res.data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
        });
      } catch (error) {
        console.error("Random Pokemon download error:", error);
      }
    };

    getPokemon();
  }, [name]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="pokemon-page">
      <div className="pokemon-card">
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
      <button className="home-btn" onClick={goHome}>Home</button>
    </div>
 

  );
};

export default PokemonPage;

