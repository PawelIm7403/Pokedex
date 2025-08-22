const NavBar = () => {
  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="nav-bar">
      <button onClick={() => scrollTo("browser")}>Browser</button>
      <button onClick={() => scrollTo("showcase")}>Showcase</button>
      <button onClick={() => scrollTo("random")}>Random Pokémon</button>
    </div>
  );
};

export default NavBar;
