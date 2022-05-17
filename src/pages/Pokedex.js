import { Component } from 'react';
import PokemonCard from '../components/PokemonCard';
import { Skeleton } from '@mui/material';
import '../components/Pokedex.css'

class Pokedex extends Component {
  state = {
    pokemonList: [],
    hasPokemon: false,
  }

  fetchPokemonUrl = async (url) => {
    console.log('pokemonUrl');
    await fetch(url)
      .then(response => response.json())
      .then(results => results.results.map(pokemon => (
        this.fetchPokemonList(pokemon.url)
      )))     
  }

  fetchPokemonList = async (url) => {
    console.log('pokemonList');
    await fetch(url)
      .then(response => response.json())
      .then(results => this.setState(prevState => ({
        pokemonList: [...prevState.pokemonList, results],
        hasPokemon: true,
      })))
  }

  componentDidMount = () => {
    console.log("DidMount");
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1&offset=486';
    this.fetchPokemonUrl(url);
  }

  render() {
    const { pokemonList, hasPokemon } = this.state;

    return (
      <div>
        {
          hasPokemon
            ? pokemonList.map(pokemon =>
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.species.name} 
                  image={pokemon.sprites.other}
                  types={pokemon.types}
                />) 
            : <Skeleton variant="rectangular" width={210} height={118} />
        }
      </div>
    )
  }
}

export default Pokedex;