import { useContext, useEffect, useState } from 'react';
import { PlanetType } from '../types';
import GlobalContext from '../context/globalContext';
import getPlanets from '../services/getPlanets';

function Table() {
  const { planets, setPlanets } = useContext(GlobalContext);
  const [savedPlanets, setSavedPlanets] = useState<PlanetType[]>([]);

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
