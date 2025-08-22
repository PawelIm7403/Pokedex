import NavBar from "./NavBar"

const WelcomeBar = () => {
  return (
    <div>
      <div className="welcome-header">
        <div className="welcome-title">
          Welcome to your National <span className="title">Pokedex</span>
        </div>
        <NavBar />
      </div>
    </div>
  )
}

export default WelcomeBar
