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

  
  characters$ = from(db.rickAndMortyCharacters.toArray()).pipe(
    switchMap(characters => {
      if(characters.length != 0){
        return of(characters);
      }else{
        return fromFetch('https://rickandmortyapi.com/api/character').pipe(
          switchMap(response => {
            if (response.ok) {
              // OK return data
              return from(response.json() as Promise<RickAndMortyCharacterResponse>).pipe(
                map(v => v.results)
              )
            } else {
              throw { error: true, message: `Error ${response.status}` };
            }
          }),
          tap(results => {
            db.rickAndMortyCharacters.bulkAdd(results)
          }),
          catchError(err => {
            throw { error: true, message: err.message };
          }),
        )
      }
    })

  )
}
