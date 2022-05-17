import { Component } from 'react';
import './Pokemon.css';
import Loading from './Loading';

class Pokemon extends Component {
  state = {
    pokemon: undefined,
    loading: true,
  }

  async fetchPokemon(name) {
    this.setState(
      { loading: true },
      async () => {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`
        const requestReturn = await fetch(url);
        const requestPokemon = await requestReturn.json();
        this.setState({
          loading: false,
          pokemon: requestPokemon
        })
      }
    )
  }

  componentDidMount() {
    const { name } = this.props;
    this.fetchPokemon(name);
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { name } = this.props;
    this.fetchPokemon(name);
  }

  renderPokemon = (pokemon) => {
    const {
      id,
      species,
      sprites,
      types,
      abilities,
    } = pokemon;

    return (
      <div key={id} className='pokemon'>
        <div className='pokemon-image'>
          <img src={sprites.other.home.front_default} alt={species.name} />
        </div>
        <div className='pokemon-name'>
          <h2>{species.name}</h2>
        </div>        
        <div className='pokemon-types'>
          {types.map((type) => (
            <p className={type.type.name}>{type.type.name}</p>
          ))}
        </div>
        <div className='pokemon-abilities'>
          {abilities.map((ability) => (
            <p>{ability.ability.name}</p>
          ))}
        </div>
      </div>
    )
  }

  render(){
    const { pokemon, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div>        
        {this.renderPokemon(pokemon)}
      </div>
    );
  }
}

export default Pokemon;