export const addCoordinate = async (latitude: number, longitude: number) => {
  const response = await fetch('http://localhost:4000/coordinates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      latitude,
      longitude
    })
  });

  if (!response.ok) {
    throw new Error('Failed to add coordinate');
  }
};

export const getCoordinates = async () => {
  const response = await fetch('http://localhost:4000/coordinates');
  if (!response.ok) {
    throw new Error('Failed to fetch coordinates');
  }
  return await response.json();
};
