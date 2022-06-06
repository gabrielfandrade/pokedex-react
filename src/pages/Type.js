import { Component } from 'react';

class Type extends Component {
  state = {
    type: undefined,
    moves: [],
    pokemonList: [],
    loading: true,
  }

  fetchPokemon = async (pokemon) => {
    const { url } = pokemon;
    await fetch(url)
      .then(response => response.json())
      .then(result => this.setState((prevState) => ({
        pokemonList: [...prevState.pokemonList, result],
      })))
  }

  fetchMoves = async (move) => {
    const { url } = move;
    await fetch(url)
      .then(response => response.json())
      .then(result => this.setState((prevState) => ({
        moves: [...prevState.moves, result],
      })))
  }

  fetchType = async (type) => {
    const url = `https://pokeapi.co/api/v2/type/${type}`;
    await fetch(url)
      .then(response => response.json())
      .then(result => {
        result.moves.forEach((move) => this.fetchMoves(move));
        result.pokemon.forEach((pokemon) => this.fetchPokemon(pokemon.pokemon));
        this.setState({
          type: result,
          loading: false,
        });
      })
  }

  componentDidMount = () => {
    const { type } = this.props;
    this.fetchType(type);
  }

  render() {
    const { type, moves, pokemonList, loading } = this.state;

    if (loading) return <div>Loading...</div>

    const pokemonSorted = pokemonList.sort((a, b) => a.id > b.id);
    
    return (
      <div className='type-infos'>
        <h1>{`${type.names[7].name} (Type)`}</h1>
        <div>
          <div>
            <h3>Weakness against</h3>
            <div>
              {
                type.damage_relations.double_damage_from.map((type, index) => (
                  <div key={ index } className={`type-icon ${type.name}`}>{type.name}</div>
                ))
              }
            </div>
          </div>
          <div>
            <h3>Strong against</h3>
            <div>
              {
                type.damage_relations.double_damage_to.map((type, index) => (
                  <div key={ index } className={`type-icon ${type.name}`}>{type.name}</div>
                ))
              }
            </div>
          </div>
          <div>
            <h3>Resistance against</h3>
            <div>
              {
                type.damage_relations.half_damage_from.map((type, index) => (
                  <div key={ index } className={`type-icon ${type.name}`}>{type.name}</div>
                ))
              }
            </div>
          </div>
          <div>
            <h3>Weak against</h3>
            <div>
              {
                type.damage_relations.half_damage_to.map((type, index) => (
                  <div key={ index } className={`type-icon ${type.name}`}>{type.name}</div>
                ))
              }
            </div>
          </div>
          <div>
            <h3>Immune against</h3>
              <div>
                {
                  type.damage_relations.no_damage_from.map((type, index) => (
                    <div key={ index } className={`type-icon ${type.name}`}>{type.name}</div>
                  ))
                }
              </div>
          </div>
        </div>
        <div>
          {
            pokemonSorted.map((pokemon, index) => (
              <div key={ index }>
                <img src={ pokemon.sprites.front_default } alt={ pokemon.species.name }/>
                <div>
                  <p>{ pokemon.species.name }</p>
                  {
                    pokemon.types.map((type) => (
                      <p>{ type.type.name }</p>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Type;
