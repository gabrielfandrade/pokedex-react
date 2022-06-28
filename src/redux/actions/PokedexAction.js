import { fetchPokeAPI } from "../../services/fetchPokemon";
export const POKEDEX = 'POKEDEX';
export const REQUEST_POKEMON = 'REQUEST_POKEMON';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const requestAPI = () => ({
  type: REQUEST_POKEMON,
});

export const pokedexAction = (pokemon) => ({
  type: POKEDEX,
  pokemon,
});

export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
})

export const fetchAllPokemon = () => async (dispatch) => {
  dispatch(requestAPI())
  const pokemon = await fetchPokeAPI();
  dispatch(pokedexAction(pokemon));
};
