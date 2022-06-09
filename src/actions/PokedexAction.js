export const POKEDEX = 'POKEDEX';

export const pokedex = (pokemonList) => ({
  type: POKEDEX,
  pokemonList,
});