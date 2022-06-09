export const POKEDEX = 'POKEDEX';

const pokedexAction = (pokemon) => ({
  type: POKEDEX,
  pokemon,
});

export default pokedexAction;