import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const [query, setQuery] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302');
      setPokemons(res.data.results); // [{name, url}]
    };
    fetchPokemons();
  }, []);

  // handling input
  const handleChange = (e) => {
  const value = e.target.value;
  setQuery(value);

  if (value.length > 0) {
    const filtered = pokemons.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 10));
  } else {
    setSuggestions([]);
  }
};


    // handling suggestion click
  const handleSelect = (name) => {
    setQuery('');
    setSuggestions([]);
    navigate(`/pokemon/${name}`); 
  };


  return (
    <>
      <div className="hero-banner" id='browser'>
        <div className="hero-content">
          <p>
            Right here you can find a list of your favourite companions,
            so you won't have to search for them anywhere else.
          </p>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter name of pokemon u want to see"
            value={query}
            onChange={handleChange}
          />

          {suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map((s, index) => (
                <li key={index} onClick={() => handleSelect(s.name)} className="search-item">
                  {s.name}
                </li>

              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="breaker">
            First 30 pokemons in pokedex
        </div>
    </>
  );
};

export default HeroBanner;
