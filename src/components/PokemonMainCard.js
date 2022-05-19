import { Component } from 'react';
import { Link } from '@mui/material';

class PokemonMainCard extends Component {
  render() {
    const { name, types, abilities, height, weight, sprite } = this.props;

    return (
      <div className="main-infos">
        <div className="pokemon-sprites">
          <img src={ sprite['official-artwork'].front_default } alt={ name } />
        </div>
        <div className="pokemon-name">
          <h3>{ name }</h3>
        </div>
        <table>
          <tbody>
            <tr className="pokemon-type">
              <th>Type</th>
              <td>
                {
                  types.map((type, index) => (
                    <a
                      href={`/type/${type.type.name}`}
                      key={ type.type.name }
                      className={ type.type.name }
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
              <td>{`${height} m`}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{`${weight} kg`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PokemonMainCard;