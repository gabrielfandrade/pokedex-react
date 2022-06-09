import { POKEDEX } from '../actions';

const INITIAL_STATE = {
  pokemonList: [],
};

const pokedexReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POKEDEX:
      return {
        ...state,
        pokemonList: action.pokemon,
      };
    default:
      return state;
  }
}

export default pokedexReducer;