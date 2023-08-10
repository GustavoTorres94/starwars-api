import { PlanetType } from '../types';

const getPlanets = async (): Promise<PlanetType[]> => {
  const response = await fetch('https://swapi.dev/api/planets');
  const { results } = await response.json();
  const baraban = results.filter((e: string) => e !== 'residents');
  return baraban;
};

export default getPlanets;
