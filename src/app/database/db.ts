import Dexie, { Table } from "dexie";
import { RickAndMortyCharacter } from "./rickAndMortyCharacter";
import { RickAndMortyEpisode } from "./rickAndMortyEpisode";

export class AppDb extends Dexie {

    rickAndMortyCharacters!: Table<RickAndMortyCharacter, number>;
    rickAndMortyEpisodes!: Table<RickAndMortyEpisode, number>;

    constructor() {
        super('ngdexieliveQuery');
        this.version(4).stores({
            rickAndMortyCharacters: '++id',
            rickAndMortyEpisodes: '++id'
        });

      }

}

export const db = new AppDb();
