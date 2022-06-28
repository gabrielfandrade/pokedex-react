import { Component } from 'react';
import { Navigate } from 'react-router-dom';
// import { Pagination } from '@mui/material';
import { connect } from 'react-redux';
import Loading from './Loading';
import PokemonCard from '../components/PokemonCard';
import { fetchAllPokemon } from '../redux/actions/PokedexAction';
import '../components/Pokedex.css';
import '../components/PokemonCard.css';
import '../components/Types.css';

const PAGES = [];
for (let i = 0; i <= 898; i += 30) {
  PAGES.push(i);
}
class Pokedex extends Component {
  state = {
    pokemonList: [],
    hasPokemon: false,
    pokemonFilter: '487',
    redirect: false,
  }

  sortPokemonList = () => {
    console.log('chamei');
    const { pokemonList } = this.state;
    const sortedList = pokemonList.sort((a, b) => a.id - b.id );
    this.props.updatePokedex(sortedList);
  }

  fetchPokemonUrl = async (url) => {
    await fetch(url)
      .then(response => response.json())
      .then(results => { results.results.forEach(pokemon => (
          this.fetchPokemonList(pokemon.url)
        ))}
      )     
  }

  fetchPokemonList = async (url) => {
    await fetch(url)
      .then(response => response.json())
      .then(results => this.setState(prevState => ({
        pokemonList: [...prevState.pokemonList, results],
      })));
  }

  componentDidMount = () => {
    this.props.updatePokedex();
  }

  showPokemonDetails = ({ target }) => {
    const { value } = target;
    this.setState({
      pokemonFilter: value,
      redirect: true,
    });
  }

  render() {
    const { pokemonList, isLoading, error } = this.props;

    if (isLoading) return <Loading />

    if (error) return <div>{error}</div>

    return (
      <div className='pokedex'>
        { pokemonList.map(pokemon =>
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

const mapStateToProps = ({ 
  pokedexReducer: { pokemonList, isLoading, error } }) => ({
    pokemonList: pokemonList.sort((a, b) => a.id - b.id),
    isLoading,
    error,
});

const mapDispatchToProps = (dispatch) => ({
  updatePokedex: () => dispatch(fetchAllPokemon()),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);