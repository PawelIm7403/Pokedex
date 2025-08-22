import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PokemonPage from './pages/PokemonPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Specified Pokemon Page */}
        <Route path="/pokemon/:name" element={<PokemonPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
