import { Injectable } from '@angular/core';
import { filter, ReplaySubject } from 'rxjs';
import { CacheService } from '../cache.service';
import { ChangeService } from '../change.service';
import { RickAndMortyCharacter } from '../database/rickAndMortyCharacter';

@Injectable()
export class TotalAlienService {
  private rickAndMortyCharacters: RickAndMortyCharacter[] = [];
  private _totalAliens = 0;

  private _totalAlienSubject = new ReplaySubject<number>(1);
  public totalAlien$ = this._totalAlienSubject.asObservable();

  constructor(cacheService: CacheService, changeService: ChangeService) {
    cacheService.rickAndMortyCharacters$.subscribe({
      next: (v) => {
        this.rickAndMortyCharacters = v;
        this._totalAliens = this.rickAndMortyCharacters.filter((c) =>
          this.isSpecieAlien(c.species)
        ).length;

        this._totalAlienSubject.next(this._totalAliens);
      },
    });

    changeService.change$
      .pipe(filter((v) => v.objectName === 'rickAndMortyCharacters'))
      .subscribe((c) => {
        if (c.nameOfProperty !== 'species') {
          return;
        }

        const wasAlien = this.isSpecieAlien(c.oldValue);
        const isAlien = this.isSpecieAlien(c.newValue);

        if (wasAlien === isAlien) {
          return;
        }

        isAlien ? this._totalAliens++ : this._totalAliens--;

        this._totalAlienSubject.next(this._totalAliens);
      });
  }

  private isSpecieAlien(specie: string) {
    return specie.toUpperCase().includes('ALIEN');
  }
}
