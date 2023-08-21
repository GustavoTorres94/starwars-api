import { PlanetType } from '../types';

export const getPlanets = async (): Promise<PlanetType[]> => {
  const response = await fetch('https://swapi.dev/api/planets');
  const { results } = await response.json();
  const baraban = results.filter((e: string) => e !== 'residents');
  return baraban;
};

export const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

export const INITIAL_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];
