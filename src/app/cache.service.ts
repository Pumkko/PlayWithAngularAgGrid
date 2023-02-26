import { Injectable } from '@angular/core';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { db } from './database/db';
import { RickAndMortyCharacter } from './database/rickAndMortyCharacter';


interface RickAndMortyCharacterResponse {
  results: RickAndMortyCharacter[]
}


@Injectable({
  providedIn: 'root'
})
export class CacheService {

  async fetchRickAndMortyCharactersAsync(bustCache = false): Promise<RickAndMortyCharacter[]> {
    let cachedCharacters: RickAndMortyCharacter[] = [];
    if(bustCache){
      await db.rickAndMortyCharacters.clear();
    }
    else {
      cachedCharacters = await db.rickAndMortyCharacters.toArray();
    }

    if (cachedCharacters.length === 0) {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const characters = await response.json() as RickAndMortyCharacterResponse;
      await db.rickAndMortyCharacters.bulkAdd(characters.results);
      return characters.results;
    } 

    return cachedCharacters;
  }
}
