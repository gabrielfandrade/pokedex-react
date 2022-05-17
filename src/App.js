import { Component } from 'react';
import './App.css';
import Pokedex from './components/Pokedex';

const GENS = [1,2,3,4,5,6,7,8];

class App extends Component{
  state = {
    gen: 0,
  }

  handleGen = ({ target }) => {
    this.setState({
      gen: target.value,
    })
  }

  render() {
    const { gen } = this.state;    

    return (
      <div className="App">
        <div>
          {GENS.map(gen => <button type='button' value={gen} onClick={this.handleGen}>{gen}</button>)}
        </div>
        {gen > 0 && <Pokedex gen={gen} />}
      </div>
    );
  }
}

export default App;
