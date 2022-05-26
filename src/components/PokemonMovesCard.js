import { Component } from 'react';

class PokemonMovesCard extends Component {
  checkLearnMethod = (methods, version, method) => {
    const game = methods.filter((detail) => detail.version_group.name === version);    
    return game.some((detail) => detail.move_learn_method.name === method);
  }

  learntByLevelUp = (moves) => {
    return moves.filter((move) => 
      this.checkLearnMethod(move.version_group_details, 'sword-shield', 'level-up')
    )
  }

  getMoveLevel = (moves, index) => {
    const versions = moves[index].version_group_details;
    const game = versions.filter((detail) => detail.version_group.name === 'sword-shield');
    const byLevelUp = game.find((detail) => detail.move_learn_method.name === 'level-up');
    return byLevelUp.level_learned_at;
  }
  
  render() {
    const { moves, levelUp } = this.props;
    const { learntByLevelUp, learntByTM, learntByTR } = moves;

    const levels = this.learntByLevelUp(levelUp);

    return (
      <div className="pokemon-moves">
        <div className="level-up-moves">
          <h2>Moves learnt by level up</h2>
          <table>
            <thead>
              <tr>
                <th>Lv.</th>
                <th>Move</th>
                <th>Type</th>
                <th>Cat.</th>
                <th>Power</th>
                <th>Acc.</th>
              </tr>
            </thead>
            <tbody>
              {learntByLevelUp.map((move, index) => (
                <tr key={ index }>
                  <td>{this.getMoveLevel(levels,index)}</td>
                  <td className="pokemon-move">{move.names[7].name}</td>
                  <td className={`type-icon ${move.type.name}`}>{move.type.name}</td>
                  <td>{move.damage_class.name}</td>
                  <td>{move.power}</td>
                  <td>{move.accuracy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tm-moves">
          <h2>Moves learnt by TM</h2>
          <table>
            <thead>
              <tr>
                <th>TM</th>
                <th>Move</th>
                <th>Type</th>
                <th>Cat.</th>
                <th>Power</th>
                <th>Acc.</th>
              </tr>
            </thead>
            <tbody>
              {learntByTM.map((move, index) => (
                <tr key={ index }>
                  <td>{move.tmName.slice(-2)}</td>
                  <td className="pokemon-move">{move.tmMove.names[7].name}</td>
                  <td className={`type-icon ${move.tmMove.type.name}`}>{move.tmMove.type.name}</td>
                  <td>{move.tmMove.damage_class.name}</td>
                  <td>{move.tmMove.power}</td>
                  <td>{move.tmMove.accuracy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tr-moves">
          <h2>Moves learnt by TR</h2>
          <table>
            <thead>
              <tr>
                <th>TR</th>
                <th>Move</th>
                <th>Type</th>
                <th>Cat.</th>
                <th>Power</th>
                <th>Acc.</th>
              </tr>
            </thead>
            <tbody>
              {learntByTR.map((move, index) => (
                <tr key={ index }>
                  <td>{move.trName.slice(-2)}</td>
                  <td className="pokemon-move">{move.trMove.names[7].name}</td>
                  <td className={`type-icon ${move.trMove.type.name}`}>{move.trMove.type.name}</td>
                  <td>{move.trMove.damage_class.name}</td>
                  <td>{move.trMove.power}</td>
                  <td>{move.trMove.accuracy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PokemonMovesCard;