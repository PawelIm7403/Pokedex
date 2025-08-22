import './Pokemons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Breaker from '../Breaker/Breaker';

const Pokemons = () => {
  const api = 'https://pokeapi.co/api/v2/pokemon?limit=30';
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const res = await axios.get(api);
        const results = res.data.results;

        const detailed = await Promise.all(
          results.map(async (p) =>{
            const details = await axios.get(p.url);
            return{
              name : p.name,
              image: details.data.sprites.front_default,
              pokeid: details.data.id.toString().padStart(3, '0')
            };
          })
        );

        setPokedex(detailed);
      } catch (error) {
        console.error("Data download error:", error);
      }
    };
    getPokemons();
  }, []);

  return (
    <>

        <div className="pokedex-container" id='showcase'>
          <div className="left-side-pokedex">
            {pokedex.slice(0, 15).map((p, index) => (
              <div key={index}>
                <img src={p.image} alt={p.name} />
                <p>{p.name}</p>
                <p className='poke-id'>#{p.pokeid}</p>
              </div>
            ))}
          </div>

          <div className="right-side-pokedex">
            {pokedex.slice(15, 30).map((p, index) => (
              <div key={index}>
                <img src={p.image} alt={p.name} />
                <p>{p.name}</p>
                <p className="poke-id">#{p.pokeid}</p>
              </div>
            ))}
          </div>
        </div>
        
        <Breaker title={"Random Pokemon"}/>
    </>
  )
}

export default Pokemons