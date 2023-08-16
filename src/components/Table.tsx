import { useContext, useEffect, useState } from 'react';
import { PlanetType, SearchType } from '../types';
import GlobalContext from '../context/globalContext';
import getPlanets from '../services/getPlanets';

function Table() {
  const INITIAL_STATE = {
    column: 'population',
    comparison: 'maior que',
    value: 0,
  };

  const INITAIAL_OPTIONS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const { planets, setPlanets } = useContext(GlobalContext);
  const [savedPlanets, setSavedPlanets] = useState<PlanetType[]>([]);
  const [search, setSearch] = useState<SearchType>(INITIAL_STATE);
  const [options, setOptions] = useState<string[]>(INITAIAL_OPTIONS);
  const [history, setHistory] = useState<SearchType[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getPlanets();
      setPlanets(data);
      setSavedPlanets(data);
    };
    fetchPlanets();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filteredPlanets = planets
      .filter((planet: PlanetType) => planet.name.includes(value));
    setPlanets(filteredPlanets);
    if (value.length === 0) {
      setPlanets(savedPlanets);
    }
  };

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement> |
    React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handleClick = () => {
    const { column, comparison, value } = search;
    const filteredPlanets = planets
      .filter((planet: SearchType) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        }
        return Number(planet[column]) === Number(value);
      });
    setPlanets(filteredPlanets);
    setHistory([...history, search]);
    const newOptions = options.filter((option: string) => option !== column);
    setOptions(newOptions);
  };

  return (
    <div>
      <form>
        <input
          type="search"
          name="search-input"
          id="search-planet"
          data-testid="name-filter"
          onChange={ handleChange }
        />
        <label htmlFor="select-filter">
          <p>Coluna:</p>
          <select
            name="column"
            id="select-filter"
            data-testid="column-filter"
            value={ search.column }
            onChange={ handleSelect }
          >
            {
              options.map((option: string, i: number) => (
                <option key={ i } value={ option }>{option}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <p>Operador:</p>
          <select
            name="comparison"
            id="comparison-filter"
            data-testid="comparison-filter"
            value={ search.comparison }
            onChange={ handleSelect }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          name="value"
          id="number-input"
          data-testid="value-filter"
          value={ search.value }
          onChange={ handleSelect }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          FILTRAR
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Sufarce Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            planets.map((planet: PlanetType, i: number) => (
              <tr key={ i }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
