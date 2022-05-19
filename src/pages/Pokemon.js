import { Component } from 'react';

class Pokemon extends Component {
  state = {
    pokemon: {},
  }

  fetchPokemon = async (url) => {
    await fetch(url)
      .then(response => response.json())
      .then(result => this.setState({
        pokemon: result,
      }))
  }

  componentDidMount = () => {
    const { id } = this.props;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    this.fetchPokemon(url);
  }

  render(){
    const { pokemon } = this.state;

    return (
      <div>
        
      </div>
    )
  }
}

export default Pokemon;