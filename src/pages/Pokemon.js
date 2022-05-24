import { Component } from 'react';
import PokemonMainCard from '../components/PokemonMainCard';
import PokemonMovesCard from '../components/PokemonMovesCard';
import '../components/Pokemon.css';

class Pokemon extends Component {
  state = {
    pokemon: undefined,
    moves: {
      learntByLevelUp: [],
      learntByTM: [],
      learntByEggGroup: [],
      learntByTutor: [],
      learntByTR: [],
    },
    hasPokemon: false,
  }

  fetchLevelUpMoves = async (move) => {
    const { url } = move;
    await fetch(url)
      .then(response => response.json())
      .then(result => this.setState((prevState) => ({
        moves: {
          learntByLevelUp: [...prevState.moves.learntByLevelUp, result],
        }
      })));
  }

  getMoveLearnMethod = (methods) => {
    return methods[methods.length - 1].move_learn_method.name;
  }

  getMoves = (moves) => {
    const movesLearnByLevelUp = moves.filter(move =>
      this.getMoveLearnMethod(move.version_group_details) === 'level-up');
    movesLearnByLevelUp.forEach(({ move }) =>
      this.fetchLevelUpMoves(move));
  }

  fetchPokemon = async (url) => {
    await fetch(url)
      .then(response => response.json())
      .then(result => {
        this.setState({
          pokemon: result,
          hasPokemon: true,
        });
        this.getMoves(result.moves);
      })
  }

  componentDidMount = () => {
    const { id } = this.props;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    this.fetchPokemon(url);
  }

  render(){
    const { pokemon, moves, hasPokemon } = this.state;

    return (
      <div className="pokemon-infos">
        { hasPokemon &&
            <PokemonMovesCard              
              moves={moves}
              levelUp={pokemon.moves}
            />
        }
        { hasPokemon &&
            <PokemonMainCard
              name={ pokemon.species.name }
              types={ pokemon.types }
              abilities={ pokemon.abilities }
              height={ pokemon.height }
              weight={ pokemon.weight }
              sprite={ pokemon.sprites.other }
              stats={ pokemon.stats }
            />
        }        
      </div>
    )
  }
}

export default Pokemon;