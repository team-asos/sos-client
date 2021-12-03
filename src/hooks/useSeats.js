import { useState, useEffect, useCallback } from 'react';

const useSeats = (floorId = null) => {
  const [data, setData] = useState([]);

  const fetchSeats = useCallback(async () => {
    if (floorId === null) return;

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/seats/search?floorId=${floorId}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    const json = await response.json();
    setData(json);
  }, [floorId]);

  useEffect(() => {
    fetchSeats();
  }, [fetchSeats]);

  return data;
};

export default useSeats;
