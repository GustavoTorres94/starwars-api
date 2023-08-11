export type FetchType = {
  data: any;
  loading: boolean;
  error: string;
};

export type PlanetType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type ContextPlanetType = {
  planets: {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    films: string[];
    created: string;
    edited: string;
    url: string;
  },
  setPlanets: (param: any) => any;
};

export type SearchType = {
  column: string;
  comparison: string;
  value: number;
};
