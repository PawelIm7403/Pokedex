import Header from '../sections/Header'
import Pokemons from '../components/Pokemons/Pokemons'
import RandomPokemon from '../components/RandomPokemon/RandomPokemon'
import Footer from '../sections/Footer/Footer'

const Home = () => {
  return (
    <>
        <Header/>
        <Pokemons/>
        <RandomPokemon/>
        <Footer/>
    </>
  )
}

export default Home