import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { db } from '../database/db';
import { RickAndMortyCharacter } from '../database/rickAndMortyCharacter';
import { RickAndMortyEpisode } from '../database/rickAndMortyEpisode';
interface RickAndMortyApiResponse<T> {
  results: T[];
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private rickAndMortyCharacterSubject = new ReplaySubject<RickAndMortyCharacter[]>(1);

  private rickAndMortyEpisodeSubject = new ReplaySubject<RickAndMortyEpisode[]>(1);

  rickAndMortyCharacters$ = this.rickAndMortyCharacterSubject.asObservable();
  rickAndMortyEpisodes$ = this.rickAndMortyEpisodeSubject.asObservable();

  async fetchRickAndMortyCharactersAsync(bustCache = false): Promise<RickAndMortyCharacter[]> {
    let cachedCharacters: RickAndMortyCharacter[] = [];
    if (bustCache) {
      await db.rickAndMortyCharacters.clear();
    } else {
      cachedCharacters = await db.rickAndMortyCharacters.toArray();
    }

    if (cachedCharacters.length === 0) {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const characters = (await response.json()) as RickAndMortyApiResponse<RickAndMortyCharacter>;
      await db.rickAndMortyCharacters.bulkAdd(characters.results);
      cachedCharacters = characters.results;
    }

    this.rickAndMortyCharacterSubject.next(cachedCharacters);
    return cachedCharacters;
  }

  async fetchRickAndMortyEpisodesAsync(bustCache = false): Promise<RickAndMortyEpisode[]> {
    let cachedEpisodes: RickAndMortyEpisode[] = [];
    if (bustCache) {
      await db.rickAndMortyEpisodes.clear();
    } else {
      cachedEpisodes = await db.rickAndMortyEpisodes.toArray();
    }

    if (cachedEpisodes.length === 0) {
      const response = await fetch('https://rickandmortyapi.com/api/episode');
      const characters = (await response.json()) as RickAndMortyApiResponse<RickAndMortyEpisode>;
      await db.rickAndMortyEpisodes.bulkAdd(characters.results);
      cachedEpisodes = characters.results;
    }

    this.rickAndMortyEpisodeSubject.next(cachedEpisodes);
    return cachedEpisodes;
  }
}
