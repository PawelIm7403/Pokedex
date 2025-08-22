import Header from '../sections/Header'
import Pokemons from '../components/Pokemons'
import RandomPokemon from '../components/RandomPokemon'
import Footer from '../sections/Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <Pokemons/>
        <RandomPokemon/>
        <Footer/>
    </div>
  )
}

export default Home