let currentPokemon;
const pokedex = document.getElementById("pokedex");
const pokemons = [];


function init() {
  fetchPokemon();
}


function showPokecard(id){
  document.getElementById('pokedex-section').classList.add('d-none');
  document.getElementById('pokemon-card-section').classList.remove('d-none');

  loadPokecard(id);
}


async function loadPokecard(id) {
  let url = `${API_URLS.pokemon}${id}`;
  let response = await fetch(url);
  currentPokemon = await response.json();

  renderPokemonInfo(id);
}


function renderPokemonInfo(id) {
  renderName(id);
  document.getElementById("image-of-pokemon").src =
    currentPokemon["sprites"]["other"]["home"]["front_shiny"];
}


function renderName() {
  let pokemonName = currentPokemon["name"];
  let name = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  document.getElementById("pokemon-name").innerHTML = name;
}


const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `${API_URLS.pokemon}${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemonData = results.map((result) => ({
      name: result.name,
      image: result.sprites["other"]["home"]["front_default"],
      type: result.types.map((type) => type.type.name).join(" "),
      id: result.id,
    }));
    pokemons.push(...pokemonData); 
    displayPokemon(pokemonData);
  });
};


const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map((pokemon) => renderPokedex(pokemon))
    .join("");

  pokedex.innerHTML = pokemonHTMLString;
};


function filterPokemon() {
  const searchTerm = document.getElementById('input').value.toLowerCase();
  const filteredPokemon = pokemons.filter(poke => {
    return poke.name.toLowerCase().includes(searchTerm) || poke.id.toString().includes(searchTerm);
  });
  displayPokemon(filteredPokemon);}
