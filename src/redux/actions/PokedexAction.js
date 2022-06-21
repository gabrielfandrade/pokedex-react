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

export function fetchPokemon(url, dispatch) {  
  return async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();    
      dispatch(pokedexAction(data));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  }
}

export function fetchAllPokemon() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');
      const data = await response.json();
      data.results.forEach(async ({url}) => {
        const response = await fetch(url);
        const data = await response.json();    
        dispatch(pokedexAction(data));
      });
    } catch (error) {
      dispatch(failedRequest(error));
    }
  }
}
