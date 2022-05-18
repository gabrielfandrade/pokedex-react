import { Component } from 'react';
import PokemonCard from '../components/PokemonCard';
import '../components/Pokedex.css';
import '../components/Pokemon.css';
import '../components/Types.css';

class Pokedex extends Component {
  state = {
    pokemonList: [],
    hasPokemon: false,
    pokemonFilter: '487',
    pokemon: undefined,
  }

  sortPokemonList = async () => {
    const { pokemonList } = this.state;
    const sortedList = pokemonList.sort((a, b) => a.id - b.id );
    this.setState({ 
      pokemonList: sortedList,
     })
  }

  fetchPokemonUrl = async (url) => {
    await fetch(url)
      .then(response => response.json())
      .then(results => results.results.map(pokemon => (
        this.fetchPokemonList(pokemon.url)
      )))     
  }

  fetchPokemonList = async (url) => {
    await fetch(url)
      .then(response => response.json())
      .then(results => this.setState(prevState => ({
        pokemonList: [...prevState.pokemonList, results],
      }), () => this.sortPokemonList()));
  }

  componentDidMount = () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=3&offset=486';
    this.fetchPokemonUrl(url);
    this.setState({ hasPokemon: true });
  }

  componentWillUnmount = () => {
    this.setState({ pokemonList: [], hasPokemon: false })
  }

  showPokemonDetails = ({ target }) => {
    alert('click!');
  }

  render() {
    const { pokemonList, hasPokemon } = this.state;

    return (
      <div className='pokedex'>
        { hasPokemon 
          && pokemonList.map(pokemon =>
            <PokemonCard
              key={pokemon.name}
              id={pokemon.id}
              name={pokemon.species.name} 
              image={pokemon.sprites.other}
              types={pokemon.types}
              showPokemonDetails={this.showPokemonDetails}
            />) }
      </div>
    )
  }
}

export default Pokedex;