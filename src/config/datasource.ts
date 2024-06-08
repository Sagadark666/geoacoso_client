import Dexie from 'dexie';

const datasource = new Dexie('mydb');

datasource.version(1).stores({
    coordinates: '++id, latitude, longitude, captured_at' // Primary key and indexed fields
});

export default datasource;
