export const addCoordinate = async (latitude: number, longitude: number): Promise<void> => {
  try {
    const response = await fetch('http://localhost:4000/coordinates', {
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
      const errorText = await response.text(); // Get error message from server response
      throw new Error(`Server error: ${errorText}`);
    }
  } catch (error) {
    console.error('Error adding coordinate:', error);
    throw new Error('Failed to add coordinate. Please try again later.');
  }
};

export const getCoordinates = async () => {
  try {
    const response = await fetch('http://localhost:4000/coordinates');
    if (!response.ok) {
      throw new Error('Failed to fetch coordinates');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error; // Rethrow error for further handling
  }
};
