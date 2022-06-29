export const getPokemon = async (start) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${start}`);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export const getPokemonDetails = async (url) => {
  const response = await fetch(url);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json); 
};

export const fetchPokeAPI = async (start) => {
  const pokemon = await getPokemon(start).then(
      (resp) => { return resp.results }
    );
  const result = [];
  for (const poke of pokemon) {
    const details = await getPokemonDetails(poke.url).then(
      (resp) => { return resp }
    );
    result.push(details);
  }
  return result;
};