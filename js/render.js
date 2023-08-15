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
  return `
        <div onclick="showPokecard(${pokemon.id})" class="card" style="background-color: ${backgroundColor};">
            <h2 class="card-title">${name}</h2>
            <div class="card-cont">${typeDivs}</div>
            <div class="id-image"><span class="card-id">#${pokemon.id}</span><img class="card-image" src="${pokemon.image}"/></div>
        </div>
        `;
}
