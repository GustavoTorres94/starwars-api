import { useState, useEffect } from 'react';
import { FetchType } from '../types';
import getPlanets from '../services/getPlanets';

function useFetch(): FetchType {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const badata = await getPlanets();
        setData(badata);
        setLoading(false);
      } catch (errors) {
        setError(errors.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return [data, loading, error];
}

export default useFetch;
