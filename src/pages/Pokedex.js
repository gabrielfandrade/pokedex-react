import { Component } from 'react';
import { Pagination } from '@mui/material';
import { connect } from 'react-redux';
import Loading from './Loading';
import PokemonCard from '../components/PokemonCard';
import { fetchAllPokemon } from '../redux/actions/PokedexAction';
import '../components/Pokedex.css';
import '../components/PokemonCard.css';
import '../components/Types.css';

const PAGE_COUNT = Math.round(898 / 30);

class Pokedex extends Component {
  state = {
    page: 1,
  }

  componentDidMount = () => {
    const { page } = this.state;
    this.props.updatePokedex((page - 1) * 30);
  }

  componentDidUpdate = (_prevProps, prevState) => {
    const { page } = this.state;
    if (page !== prevState.page) {
      this.props.updatePokedex((page - 1) * 30);
    }
  }

  handlePage = (_event, page) => {
    this.setState({
      page: page,
    });
  };

  render() {
    const { pokemonList, isLoading, error } = this.props;
    const { page } = this.state;

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
            />) }
        <div className="pagination">
          <Pagination
            count={ PAGE_COUNT }
            page={ page }
            color="primary"
            size="large"
            showFirstButton
            showLastButton
            onChange={ this.handlePage }
          />
        </div>
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
  updatePokedex: (start) => dispatch(fetchAllPokemon(start)),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);