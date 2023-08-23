import { useContext, useEffect, useState } from 'react';
import { PlanetType, SearchType } from '../types';
import GlobalContext from '../context/globalContext';
import { getPlanets, INITIAL_STATE, INITIAL_OPTIONS } from '../services/getPlanets';

function Table() {
  const { planets, setPlanets } = useContext(GlobalContext);
  const [savedPlanets, setSavedPlanets] = useState<PlanetType[]>([]);
  const [search, setSearch] = useState<SearchType>(INITIAL_STATE);
  const [options, setOptions] = useState<string[]>(INITIAL_OPTIONS);
  const [filters, setFilters] = useState<SearchType[]>([]);
  const [id, setId] = useState<number>(1);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });
  useEffect(() => {
    const fetchPlanets = async () => {
      const data = await getPlanets(); setPlanets(data); setSavedPlanets(data);
      console.log(savedPlanets);
    }; fetchPlanets();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filteredPlanets = planets.filter((ev: PlanetType) => ev.name.includes(value));
    setPlanets(filteredPlanets);
    if (value.length === 0) setPlanets(savedPlanets);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement> |
  React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; setSearch({ ...search, [name]: value });
    if (name === 'sort-order') {
      setOrder({ ...order, sort: value });
    } else {
      setOrder({ ...order, column: value });
    }
  };

  const handleClick = () => {
    const { column, comparison, value } = search;
    const newFilter = { id, column, comparison, value: Number(value) };
    const filteredPlanets = planets.filter((planet: SearchType) => {
      if (comparison === 'maior que') return Number(planet[column]) > Number(value);
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      } return Number(planet[column]) === Number(value);
    });
    setPlanets(filteredPlanets);
    setFilters([...filters, newFilter]);
    const newOptions = options.filter((option: string) => option !== search.column);
    setOptions(newOptions);
    setId(id + 1);
    setSearch(INITIAL_STATE);
  };
  const handleRemove = (param: number) => {
    const newFilters = filters.filter((filter: SearchType) => filter.id !== param);
    setFilters(newFilters);
    const newOptions = [...options, filters
      .find((filter: SearchType) => filter.id === param)?.column];
    setOptions(newOptions);
    const filteredPlanets = newFilters.reduce((filtered, filter) => {
      const { column, comparison, value } = filter;
      return filtered.filter((planet: PlanetType) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        } if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        } return Number(planet[column]) === Number(value);
      });
    }, savedPlanets);
    setPlanets(filteredPlanets.length === 0 ? savedPlanets : filteredPlanets);
  };
  const handleClear = () => {
    setPlanets(savedPlanets); setFilters([]); setOptions(INITIAL_OPTIONS);
  };
  const handleOrder = () => {
    const orderedPlanets = planets.slice().sort((a: PlanetType, b: PlanetType) => {
      const aValue = a[order.column];
      const bValue = b[order.column];
      if (aValue === 'unknown' && bValue === 'unknown') return 0;
      if (aValue === 'unknown') return 1;
      if (bValue === 'unknown') return -1;
      return order.sort === 'ASC' ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });
    setPlanets(orderedPlanets);
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
            { options.map((o: string, i: number) => (
              <option key={ i } value={ o }>{o}</option>))}
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
      <div>
        {
          filters.map((filter: SearchType) => (
            <div key={ filter.id }>
              <p data-testid="filter">
                {`${filter.column} ${filter.comparison} ${filter.value}`}
                <button
                  type="button"
                  onClick={ () => handleRemove(filter.id) }
                >
                  X
                </button>
              </p>
            </div>
          ))
        }
      </div>
      <div>
        <label htmlFor="ordenate">
          <p>Ordenar por:</p>
          <select
            name=""
            id="ordenate"
            data-testid="column-sort"
            onChange={ handleSelect }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="asc-radio">
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            name="sort-order"
            onChange={ handleSelect }
          />
          Ascendente
        </label>
        <label htmlFor="desc-radio">
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            name="sort-order"
            onChange={ handleSelect }
          />
          Descendente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleOrder }
        >
          ORDENAR
        </button>
      </div>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleClear }
      >
        LIMPAR TODOS OS FILTROS
      </button>
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
            <th>Surface Water</th>
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
                <td data-testid="planet-name">{planet.name}</td>
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
