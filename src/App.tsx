import Home from './pages/Home';
import PlanetProvider from './context/globalProvider';
import './App.css';

function App() {
  return (
    <PlanetProvider>
      <div>
        <Home />
      </div>
    </PlanetProvider>
  );
}

export default App;
