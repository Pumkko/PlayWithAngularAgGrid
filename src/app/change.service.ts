import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Subject } from 'rxjs';
import { AppDb, db } from './database/db';
import { RickAndMortyCharacter } from './database/rickAndMortyCharacter';
import { RickAndMortyEpisode } from './database/rickAndMortyEpisode';



export type GenerateChangeProps<T extends {id: number}, TName extends keyof Omit<AppDb, keyof Dexie>> = { objectName: TName, id: number} & {
  [K in keyof Omit<T, 'id'>]: {
    nameOfProperty: K;
    newValue: T[K];
    oldValue: T[K];
  }
}[keyof Omit<T, 'id'>];


export type RickAndMortyCharacterChange = GenerateChangeProps<RickAndMortyCharacter, 'rickAndMortyCharacters'>;
export type RickAndMortyEpisodeChange = GenerateChangeProps<RickAndMortyEpisode, 'rickAndMortyEpisodes'>;

export type Change = RickAndMortyCharacterChange | RickAndMortyEpisodeChange

@Injectable({
  providedIn: 'root'
})
export class ChangeService {
  private changeSubject = new Subject<Change>();
  change$ = this.changeSubject.asObservable();

  async pushChangeAsync(change: Change) {
    await db[change.objectName].update(change.id, {
      [change.nameOfProperty]: change.newValue
    })

    this.changeSubject.next(change);
  }

}
