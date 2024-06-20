const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const addCoordinate = async (latitude: number, longitude: number) => {
  const response = await fetch(`${API_BASE_URL}/coordinates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      latitude,
      longitude,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add coordinate');
  }
};

export const getCoordinates = async () => {
  const response = await fetch(`${API_BASE_URL}/coordinates`);
  if (!response.ok) {
    throw new Error('Failed to fetch coordinates');
  }
  return await response.json();
};
