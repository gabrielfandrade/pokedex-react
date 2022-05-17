import { Component } from 'react';
import Loading from './Loading';
import Pokemon from './Pokemon';
import './Pokedex.css';
import './Types.css';

class Pokedex extends Component {
  state = {
    gen: 0,
    pokemon: [],
    loading: true,
  }

  fetchPokedex = (gen) => {
    const url = `https://pokeapi.co/api/v2/generation/${gen}/`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({
        pokemon: data.pokemon_species,
        loading: false,
      }))
  }

  componentDidMount = () => {
    const { gen } = this.props;
    this.fetchPokedex(gen);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { gen } = this.props;
    if (prevProps.gen !== gen) this.fetchPokedex(gen);
  }

  render() {
    const { pokemon, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div className='pokedex'>
        {pokemon.map(pokemon => <Pokemon key={pokemon.name} name={pokemon.name} />)}
      </div>
    )
  }
}

export default Pokedex;