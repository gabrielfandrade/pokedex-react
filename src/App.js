import './App.css';
import Pokemon from './components/Pokemon'

function App() {
  return (
    <div className="App">
      <Pokemon key={'giratina'} url={'https://pokeapi.co/api/v2/pokemon/487'}/>
    </div>
  );
}

export default App;
