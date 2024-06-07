import datasource from "../config/datasource";
import {Coordinate} from "../types/coordinates";

export const addCoordinate = async (latitude: number, longitude: number) => {
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    console.error("Invalid coordinates");
    return;
  }
  try {
    await datasource.table<Coordinate>('coordinates').add({
      latitude,
      longitude,
      captured_at: new Date()
    });
  } catch (error) {
    console.error("Error adding coordinate:", error);
  }
};


export const getCoordinates = async () => {
  try {
    return await datasource.table<Coordinate>('coordinates').toArray();
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return [];
  }
};
