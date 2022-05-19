import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';

const WrappedComponent = props => {
  const { id } = useParams();
  return <Pokemon id={id} {...props} />
}
class App extends Component{

  showPokemonDetails = ({ target }) => {
    const { value } = target;
    console.log('click!');
  }

  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Pokedex showPokemonDetails={this.showPokemonDetails} />} />
            <Route path="/pokemon/:id" element={<WrappedComponent />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
