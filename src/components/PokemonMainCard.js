import { Component } from 'react';

class PokemonMainCard extends Component {
  render() {
    const { name, types, abilities, height, weight, sprite } = this.props;

    const heightFormat = height.toString().split('').join('.');
    const weightFormat = weight.toString();
    const size = weightFormat.length;

    return (
      <div className="main-infos">
        <div className="pokemon-sprites">
          <img src={sprite['official-artwork'].front_default } alt={ name } />
        </div>
        <div className="pokemon-main-infos">
          <h2>{ name }</h2>
          <table className="table">
            <tbody>
              <tr className="pokemon-type">
                <th>Type</th>
                <td>
                  {
                    types.map((type, index) => (
                      <a
                        href={`/type/${type.type.name}`}
                        key={ type.type.name }
                        className={`${type.type.name} type-icon`}
                      >
                        {type.type.name}
                      </a>
                    ))
                  }
                </td>
              </tr>
              <tr className="pokemon-ability">
                <th>Abilities</th>
                <td>
                  {
                    abilities.map((ability, index) => (
                      <a
                        href={`/ability/${ability.ability.name}`}
                        key={ ability.ability.name }
                      >
                        { ability.ability.name }
                      </a>
                    ))
                  }
                </td>
              </tr>
              <tr>
                <th>Height</th>
                <td>{`${heightFormat} m`}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{`${weightFormat.slice(0,size - 1)}.${weightFormat.slice(size - 1,size)} kg`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PokemonMainCard;