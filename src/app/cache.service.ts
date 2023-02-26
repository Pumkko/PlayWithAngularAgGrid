import { Injectable } from '@angular/core';
import {  ReplaySubject} from 'rxjs';
import { db } from './database/db';
import { RickAndMortyCharacter } from './database/rickAndMortyCharacter';
interface RickAndMortyCharacterResponse {
  results: RickAndMortyCharacter[]
}


@Injectable({
  providedIn: 'root'
})
export class CacheService {


  private rickAndMortyCharacterSubject = new ReplaySubject<RickAndMortyCharacter[]>(1);
  rickAndMortyCharacters$ = this.rickAndMortyCharacterSubject.asObservable();

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
      cachedCharacters = characters.results;
    } 

    this.rickAndMortyCharacterSubject.next(cachedCharacters);
    return cachedCharacters;
  }
}
