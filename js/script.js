let currentPokemon;
const pokedex = document.getElementById("pokedex");
const pokemons = [];


function init() {
  fetchPokemon();
}


function showPokecard(id, background, typeDivs){
  document.getElementById('pokedex-section').classList.add('d-none');
  document.getElementById('pokemon-card-section').classList.remove('d-none');
  let type = JSON.parse(decodeURIComponent(typeDivs));
  loadPokecard(id, background, type);
}


async function loadPokecard(id, background, type) {
  let url = `${API_URLS.pokemon}${id}`;
  let response = await fetch(url);
  currentPokemon = await response.json();

  renderPokemonInfo(background, type);
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
