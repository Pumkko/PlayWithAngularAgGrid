import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { CacheService } from 'src/app/cache.service';
import { ChangeService } from 'src/app/change.service';
import { RickAndMortyCharacter } from 'src/app/database/rickAndMortyCharacter';

@Component({
  selector: 'app-total-human',
  templateUrl: './total-human.component.html',
  styleUrls: ['./total-human.component.scss'],
})
export class TotalHumanComponent {
  private rickAndMortyCharacters: RickAndMortyCharacter[] = [];
  totalAliens = 0;

  constructor(cacheService: CacheService, changeService: ChangeService) {
    cacheService.rickAndMortyCharacters$.subscribe({
      next: (v) => {
        this.rickAndMortyCharacters = v;
        this.totalAliens = this.rickAndMortyCharacters.filter((c) =>
          this.isSpecieAlien(c.species)
        ).length;
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

        isAlien ? this.totalAliens++ : this.totalAliens--;
      });
  }

  private isSpecieAlien(specie: string) {
    return specie.toUpperCase().includes('ALIEN');
  }
}
