import { Component } from 'react';
import './Pokemon.css';

class Pokemon extends Component {
  state = {
    pokemon: undefined,
    loading: true,
  }

  async fetchPokemon(url) {
    this.setState(
      { loading: true },
      async () => {
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
    const { url } = this.props;
    this.fetchPokemon(url);
  }

  renderPokemon = () => {
    const {
      id,
      species,
      sprites,
      types,
      abilities,
    } = this.state.pokemon;

    return (
      <div key={id} className='pokemon'>
        <div className='pokemon-image'>
          <img src={sprites.other.home.front_default} alt={species.name} />
        </div>
        <div className='pokemon-name'>
          <h2>{species.name}</h2>
        </div>        
        <div className='pokemon-types'>
          {types.map(({ type: type }) => (
            <p>{type.name}</p>
          ))}
        </div>
        <div className='pokemon-abilities'>
          {abilities.map(({ ability: ability }) => (
            <p>{ability.name}</p>
          ))}
        </div>
      </div>
    )
  }

  loadingPokemon = () => {
    const { loading } = this.state;

    return loading
      ? <span>Loadiang...</span>
      : this.renderPokemon()
  }

  render(){
    const loadingElement = this.loadingPokemon();

    return (
      <div>        
        {loadingElement}
      </div>
    );
  }
}

export default Pokemon;