import { useState } from 'react';
import { ContextPlanetType } from '../types';
import GlobalContext from './globalContext';

function PlanetProvider({ children }: { children: React.ReactNode }) {
  const [planets, setPlanets] = useState<ContextPlanetType[]>([]);

  const planetContext = {
    planets,
    setPlanets,
  };

  return (
    <GlobalContext.Provider value={ planetContext }>
      {children}
    </GlobalContext.Provider>
  );
}

export default PlanetProvider;
