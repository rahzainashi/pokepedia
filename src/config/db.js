import Dexie from 'dexie';

export const db = new Dexie('pokemonDatabase');
db.version(1).stores({
  pokemons: '++id, name, &nickname, image, pokemonId', // Primary key and indexed props
});
