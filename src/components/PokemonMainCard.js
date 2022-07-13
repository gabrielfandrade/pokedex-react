import React from 'react';

function PokemonMainCard({ name, types, abilities, height, weight, sprite, stats }) {
  const totalStats = (stats) => {
    return stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  }

  let heightFormat = height.toString().split('').join('.');
  let weightFormat = weight.toString();
  if (heightFormat.length === 1) heightFormat = '0'.concat(heightFormat).split('').join('.');
  if (weightFormat.length === 1) weightFormat = '0'.concat(weightFormat);
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
      <div className="pokemon-stats">
        <h3>Base stats</h3>
        <table>
          <tbody>
            <tr>
              <th>HP</th>
              <td>{stats[0].base_stat}</td>
              <td></td>
            </tr>
            <tr>
              <th>Attack</th>
              <td>{stats[1].base_stat}</td>
            </tr>
            <tr>
              <th>Defense</th>
              <td>{stats[2].base_stat}</td>
            </tr>
            <tr>
              <th>Sp. Atk</th>
              <td>{stats[3].base_stat}</td>
            </tr>
            <tr>
              <th>Sp. Def</th>
              <td>{stats[4].base_stat}</td>
            </tr>
            <tr>
              <th>Speed</th>
              <td>{stats[5].base_stat}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{totalStats(stats)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PokemonMainCard;