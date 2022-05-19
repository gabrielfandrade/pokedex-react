import { Component } from 'react';
import PokemonMainCard from '../components/PokemonMainCard';
import '../components/Pokemon.css';

class Pokemon extends Component {
  state = {
    pokemon: undefined,
    hasPokemon: false,
  }

  fetchPokemon = async (url) => {
    await fetch(url)
      .then(response => response.json())
      .then(result => this.setState({
        pokemon: result,
        hasPokemon: true,
      }))
  }

  componentDidMount = () => {
    const { id } = this.props;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    this.fetchPokemon(url);
  }

  render(){
    const { pokemon, hasPokemon } = this.state;

    return (
      <div className="pokemon-infos">
        { hasPokemon &&
            <PokemonMainCard
              name={ pokemon.species.name }
              types={ pokemon.types }
              abilities={ pokemon.abilities }
              height={ pokemon.height }
              weight={ pokemon.weight }
              sprite={ pokemon.sprites.other }
            />
        }
      </div>
    )
  }
}

export default Pokemon;