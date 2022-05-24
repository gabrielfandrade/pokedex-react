import { Component, version } from 'react';

class PokemonMovesCard extends Component {
  getMoveLearnMethod = (methods) => {
    return methods[methods.length - 1].move_learn_method.name;
  }

  learntByLevelUp = (moves) => {
    return moves.filter((move) => 
      this.getMoveLearnMethod(move.version_group_details) === 'level-up'
    )
  }

  getMoveLevel = (moves, index) => {
    const version = moves[index].version_group_details;
    return version[version.length - 1].level_learned_at;
  }
  
  render() {
    const { moves, levelUp } = this.props;
    const { learntByLevelUp } = moves;

    const levels = this.learntByLevelUp(levelUp);

    console.log(levels);

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
                <tr>
                  <td>{this.getMoveLevel(levels,index)}</td>
                  <td>{move.name}</td>
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