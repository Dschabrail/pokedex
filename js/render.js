
function renderPokemonInfo(background, type) {
  let pokemonName = currentPokemon["name"];
  let name = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
  let image =currentPokemon["sprites"]["other"]["home"]["front_shiny"];
  document.getElementById('pokemon-card-section').innerHTML = renderPokemonInfoTemplate(name, image, background, type);
}
  
function renderPokemonInfoTemplate(name, image, background, type){
  return `
  <div class="pokemon-card">
  <div id="card-background" style="background-color: ${background};">
          <h1 class="card-name" id="pokemon-name">${name}</h1>
          <div class="card-cont">${type}</div>
          <div id="image-container"><img id="image-of-pokemon" src="${image}" alt="Image of Pokemon"></div>
  </div>
  <div id="info-container">
      <nav>
          <span class="nav-info" onclick="renderAbout()">About</span>
          <span class="nav-info" onclick="renderStats()">Stats</span>
          <span class="nav-info" onclick="renderMoves()">Moves</span>
      </nav>
      <div id="pokemon-info"></div>
  </div>

  `
}    




function renderAbout() {

}


function renderStats() {

}


function renderMoves() {

}


function renderPokedex(pokemon) {
  let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const backgroundColor = getBackgroundColor(pokemon.type.split(" ")[0],
    cardBackgroundColors);

const typeDivs = pokemon.type.split(" ").map((type) => {
    const typeBackgroundColor = getBackgroundColor(type, tagColors);
    return `<div class="card-type" style="background-color: ${typeBackgroundColor};">${type}</div>`;
    }).join("");
    const renderedTemplate = renderPokedexTemplate(pokemon,name,backgroundColor,typeDivs);
    return renderedTemplate;
}


function getBackgroundColor(type, colorMap) {
  const normalizedType = type.toLowerCase();
  return colorMap[normalizedType] || "#FFFFFF";
}


function renderPokedexTemplate(pokemon, name, backgroundColor, typeDivs) {
  const escapedTypeDivs = encodeURIComponent(typeDivs);
  return `
        <div onclick="showPokecard(${pokemon.id}, '${backgroundColor}', '${escapedTypeDivs}')" class="card" style="background-color: ${backgroundColor};">
            <h2 class="card-title">${name}</h2>
            <div class="card-cont">${typeDivs}</div>
            <div class="id-image"><span class="card-id">#${pokemon.id}</span><img class="card-image" src="${pokemon.image}"/></div>
        </div>
        `;
}
