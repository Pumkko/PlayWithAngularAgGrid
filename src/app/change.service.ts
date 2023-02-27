import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { BehaviorSubject, Subject } from 'rxjs';

import { AppDb, db } from './database/db';
import { RickAndMortyCharacter } from './database/rickAndMortyCharacter';
import { RickAndMortyEpisode } from './database/rickAndMortyEpisode';
import { NetworkService } from './network.service';


export type AppDbTableProperties = keyof Omit<AppDb, keyof Dexie>

export type GenerateChangeProps<T extends {id: number}, TName extends AppDbTableProperties> = { objectName: TName, id: number} & {
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

  /**
   * List of all the changes which have not yet been sent to the server
   */
  private changeToSyncSubject = new BehaviorSubject<Change[]>([]);
  changeToSync$ = this.changeToSyncSubject.asObservable();

 
  private isOnline = true;
  
  constructor(networkService: NetworkService) {
    networkService.healthCheck$.subscribe((isOnline) => this.isOnline = isOnline)
  }

  async pushChangeAsync(change: Change) {
    await db[change.objectName].update(change.id, {
      [change.nameOfProperty]: change.newValue
    })

    if(!this.isOnline){
      this.changeToSyncSubject.next([...this.changeToSyncSubject.value, change]);
    }else {
      await this.sendChangeToServer(change);
    }

    this.changeSubject.next(change);
  }

  async synchronizeChange() {

    if(!this.isOnline){
      return;
    }

    /* call the server */
    this.changeToSyncSubject.next([]);
  }


  private async sendChangeToServer(change: Change) {
    /*Do Stuff */
  }


}
