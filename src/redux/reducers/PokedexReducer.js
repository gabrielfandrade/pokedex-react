import { POKEDEX, REQUEST_POKEMON, FAILED_REQUEST } from '../actions/PokedexAction';

const INITIAL_STATE = {
  pokemonList: [],
  isLoading: true,
  error: '',
};

const pokedexReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_POKEMON:
      return {
        ...state,
        isLoading: true,
      };
    case POKEDEX:
      return {
        ...state,
        pokemonList: [...state.pokemonList, action.pokemon],
        isLoading: false,
      };
    case FAILED_REQUEST:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      }
    default:
      return state;
  }
}

export default pokedexReducer;