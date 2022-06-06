import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';
import Type from './pages/Type';

const WrappedComponent = props => {
  const { id, type } = useParams();
  if (id) return <Pokemon id={id} {...props} />;
  if (type) return <Type type={type} {...props} />;
}
class App extends Component{
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<WrappedComponent />} />
          <Route path="/type/:type" element={<WrappedComponent />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
