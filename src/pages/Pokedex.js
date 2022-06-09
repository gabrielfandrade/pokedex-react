import { Component } from 'react';
// import { Navigate } from 'react-router-dom';
// import { Pagination } from '@mui/material';
import { connect } from 'react-redux';
import PokemonCard from '../components/PokemonCard';
import pokedexAction from '../redux/actions/PokedexAction';
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
    // pokemonFilter: '487',
    // pokemon: undefined,
    // redirect: false,
  }

  sortPokemonList = () => {
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
      }), () => this.sortPokemonList()));
  }

  componentDidMount = () => {
    // const { filter } = this.state;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=898&offset=0`;
    this.fetchPokemonUrl(url);
    this.setState({ hasPokemon: true });
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
    const { hasPokemon } = this.state;
    const { pokemonList } = this.props;

    // if (redirect) return <Navigate to={`/pokemon/${pokemonFilter}`} />

    if (!hasPokemon) return <div>Carregando...</div>

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

const pokedexFilter = (pokemon) => {
  return pokemon.id >= 0 && pokemon.id <= 30;
};

const mapStateToProps = (state) => ({
  pokemonList: state.pokedexReducer.pokemonList.filter(pokedexFilter),
});

const mapDispatchToProps = (dispatch) => ({
  updatePokedex: (pokemonList) => dispatch(pokedexAction(pokemonList)),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);