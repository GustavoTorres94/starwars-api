import { createContext } from 'react';
import { ContextPlanetType } from '../types';

const GlobalContext = createContext({} as ContextPlanetType);

export default GlobalContext;
