import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RickAndMortyCharacter } from './database/rickAndMortyCharacter';
import { RickAndMortyEpisode } from './database/rickAndMortyEpisode';



export type GenerateChangeProps<T extends {id: number}, TName extends string> = {objectName: TName} & {
  [K in keyof Omit<T, 'id'>]: {
    nameOfProperty: K;
    newValue: T[K];
    oldValue: T[K];
  }
}[keyof Omit<T, 'id'>];


export type RickAndMortyCharacterChange = GenerateChangeProps<RickAndMortyCharacter, 'RickAndMortyCharacter'>;
export type RickAndMortyEpisodeChange = GenerateChangeProps<RickAndMortyEpisode, 'RickAndMortyEpisode'>;

export type Change = RickAndMortyCharacterChange | RickAndMortyEpisodeChange

@Injectable({
  providedIn: 'root'
})
export class ChangeService {
  private changeSubject = new Subject<Change>();
  change$ = this.changeSubject.asObservable();

  pushChange(change: Change) {
    this.changeSubject.next(change);
  }

}
