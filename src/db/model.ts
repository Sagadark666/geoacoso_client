import datasource from "../config/datasource";
import { Coordinate } from "../types/coordinates";

export const addCoordinate = async (latitude: number, longitude: number) => {
  await datasource.table<Coordinate>('coordinates').add({
    latitude,
    longitude,
    captured_at: new Date()
  });
};

export const getCoordinates = async () => {
  return await datasource.table<Coordinate>('coordinates').toArray();
};
