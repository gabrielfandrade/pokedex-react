import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';

const WrappedComponent = props => {
  const { id } = useParams();
  return <Pokemon id={id} {...props} />
}
class App extends Component{
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<WrappedComponent />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
