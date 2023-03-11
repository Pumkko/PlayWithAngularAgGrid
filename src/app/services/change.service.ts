import { Injectable } from '@angular/core';
import Dexie, { IndexableType, Table } from 'dexie';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppDb, db } from '../database/db';

import { NetworkService } from './network.service';

export type DeclaredTables = Omit<AppDb, keyof Dexie>;
type ExtractModelType<TTable> = TTable extends Table<infer T, IndexableType>
  ? T
  : never;
type ExtractPropertyInModelType<TTableName extends keyof DeclaredTables> = Omit<
  ExtractModelType<AppDb[TTableName]>,
  'id'
>;

export type GenerateChangeProps<TTableName extends keyof DeclaredTables> = {
  [K in keyof ExtractPropertyInModelType<TTableName>]: {
    objectName: TTableName;
    id: number;
    nameOfProperty: K;
    newValue: ExtractModelType<AppDb[TTableName]>[K];
    oldValue: ExtractModelType<AppDb[TTableName]>[K];
  };
}[keyof ExtractPropertyInModelType<TTableName>];

export type Change = {
  [K in keyof DeclaredTables]: GenerateChangeProps<K>;
}[keyof DeclaredTables];

@Injectable({
  providedIn: 'root',
})
export class ChangeService {
  private changeSubject = new Subject<Change>();
  change$ = this.changeSubject.asObservable();

  myNumber = 0;

  /**
   * List of all the changes which have not yet been sent to the server
   */
  private changeToSyncSubject = new BehaviorSubject<Change[]>([]);
  changeToSync$ = this.changeToSyncSubject.asObservable();

  private isOnline = true;

  constructor(networkService: NetworkService) {
    networkService.healthCheck$.subscribe(
      (isOnline) => (this.isOnline = isOnline)
    );
  }

  async pushChangeAsync(change: Change) {
    await db[change.objectName].update(change.id, {
      [change.nameOfProperty]: change.newValue,
    });

    if (!this.isOnline) {
      this.changeToSyncSubject.next([
        ...this.changeToSyncSubject.value,
        change,
      ]);
    } else {
      await this.sendChangeToServer(change);
    }

    this.changeSubject.next(change);
  }

  async synchronizeChange() {
    if (!this.isOnline) {
      return;
    }

    /* call the server */
    this.changeToSyncSubject.next([]);
  }

  private async sendChangeToServer(change: Change) {
    /*Do Stuff */
  }
}
