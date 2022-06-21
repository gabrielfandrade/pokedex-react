import { Component } from 'react';
import { Navigate } from 'react-router-dom';
// import { Pagination } from '@mui/material';
import { connect } from 'react-redux';
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
    // page: 1,
    // filter: 0,
    pokemonList: [],
    hasPokemon: false,
    pokemonFilter: '487',
    // pokemon: undefined,
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
    // const { filter } = this.state;
    // const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`;
    // this.fetchPokemonUrl(url);
    // this.setState({ hasPokemon: true });
  }

  // componentDidUpdate = (_prevProps, prevState) => {
  //   const { page, filter } = this.state;
  //   if (page !== prevState.page) {
  //     const url = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`;
  //     this.fetchPokemonUrl(url);
  //   }
  // }

  // componentWillUnmount = () => {
  //   this.setState({ pokemonList: [], hasPokemon: false })
  // }

  showPokemonDetails = ({ target }) => {
    const { value } = target;
    this.setState({
      pokemonFilter: value,
      redirect: true,
    });
  }

  // handleChange = ({ target }) => {
  //   const { textContent } = target;
  //   const page = parseInt(textContent, 10);
  //   this.setState({
  //     page,
  //     filter: PAGES[page - 1],
  //   });
  // }

  render() {
    // const { hasPokemon, pokemonList, redirect, pokemonFilter } = this.state;
    const { pokemonList, isLoading, error } = this.props;

    if (isLoading) return <div>...Loading</div>

    if (error) return <div>{error}</div>

    // if (redirect) return <Navigate to={`/pokemon/${pokemonFilter}`} />

    // if (!hasPokemon) return <div>Carregando...</div>

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
        {/* <div className="pagination">
          <Pagination
            count={ PAGES.length }
            variant="outlined"
            shape="rounded"
            onChange={ this.handleChange }
          />
        </div> */}
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