import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pokedex from './pages/Pokedex';

class App extends Component{
  render() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Pokedex />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
