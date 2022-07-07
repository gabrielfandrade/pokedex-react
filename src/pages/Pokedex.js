import { Component, useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { connect } from 'react-redux';
import Loading from './Loading';
import PokemonCard from '../components/PokemonCard';
import { fetchAllPokemon } from '../redux/actions/PokedexAction';
import '../components/Pokedex.css';
import '../components/PokemonCard.css';
import '../components/Types.css';

const PAGE_COUNT = Math.round(905 / 30);

function Pokedex({ pokemonList, isLoading, error, updatePokedex }) {
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    updatePokedex((page - 1) * 30);
  }, [page, updatePokedex]);

  const handlePage = (_event, page) => {
    setPage(page);
  };

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
          onChange={ handlePage }
        />
      </div>
    </div>
  )
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