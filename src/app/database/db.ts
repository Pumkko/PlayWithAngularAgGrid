import Dexie, { Table } from "dexie";
import { RickAndMortyCharacter } from "./rickAndMortyCharacter";

export class AppDb extends Dexie {

    rickAndMortyCharacters!: Table<RickAndMortyCharacter, number>;

    constructor() {
        super('ngdexieliveQuery');
        this.version(3).stores({
            rickAndMortyCharacters: '++id',
        });

      }

}

export const db = new AppDb();
