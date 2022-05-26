import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import '../components/Pokedex.css';
import '../components/PokemonCard.css';
import '../components/Types.css';

class Pokedex extends Component {
  state = {
    pokemonList: [],
    hasPokemon: false,
    pokemonFilter: '487',
    pokemon: undefined,
    redirect: false,
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
      .then(results => results.results.forEach(pokemon => (
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
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=898&offset=0';
    this.fetchPokemonUrl(url);
    this.setState({ hasPokemon: true });
  }

  componentWillUnmount = () => {
    this.setState({ pokemonList: [], hasPokemon: false })
  }

  showPokemonDetails = ({ target }) => {
    const { value } = target;
    this.setState({
      pokemonFilter: value,
      redirect: true,
    });
  }

  render() {
    const { pokemonList, hasPokemon, redirect, pokemonFilter } = this.state;

    if (redirect) return <Navigate to={`/pokemon/${pokemonFilter}`} />

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