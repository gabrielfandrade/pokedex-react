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
          ...prevState.moves,
          learntByLevelUp: [...prevState.moves.learntByLevelUp, result],
        }
      })));
  }

  fetchTMMoves = async (move) => {
    const { url } = move;
    await fetch(url)
      .then(response => response.json())
      .then(result => this.setState((prevState) => ({
        moves: {
          ...prevState.moves,
          learntByTM: [...prevState.moves.learntByTM, result],
        }
      })));
  }

  getMoveLearnMethod = (methods) => {
    return methods[methods.length - 1].move_learn_method.name;
  }

  checkLearnMethod = (methods, version, method) => {
    const game = methods.filter((detail) => detail.version_group.name === version);    
    return game.some((detail) => detail.move_learn_method.name === method);
  }

  getMoves = (moves) => {
    const movesLearnByLevelUp = moves.filter(move =>
      this.checkLearnMethod(move.version_group_details, 'sword-shield', 'level-up'));
    const movesLearnByTM = moves.filter(move =>
      this.checkLearnMethod(move.version_group_details, 'sword-shield', 'machine'));      
    movesLearnByLevelUp.forEach(({ move }) =>
      this.fetchLevelUpMoves(move));
    movesLearnByTM.forEach(({ move }) =>
      this.fetchTMMoves(move));
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