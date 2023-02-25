import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

export interface RickAndMortyCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string[];
  created: string;
}


interface RickAndMortyCharacterResponse {
  results: RickAndMortyCharacter[]
}



@Injectable({
  providedIn: 'root'
})
export class DataService {

  characters$ = fromFetch('https://rickandmortyapi.com/api/character').pipe(
    switchMap(response => {
      if (response.ok) {
        // OK return data
        return response.json() as Promise<RickAndMortyCharacterResponse>;
      } else {
        throw { error: true, message: `Error ${response.status}` };
      }
    }),
    catchError(err => {
      throw { error: true, message: err.message };
    })
  );

  constructor() { }
}
