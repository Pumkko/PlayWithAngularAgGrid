import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { CacheService } from 'src/app/cache.service';
import { ChangeService } from 'src/app/change.service';
import { RickAndMortyCharacter } from 'src/app/database/rickAndMortyCharacter';

@Component({
  selector: 'app-total-human',
  templateUrl: './total-human.component.html',
  styleUrls: ['./total-human.component.scss']
})
export class TotalHumanComponent {


  private rickAndMortyCharacters: RickAndMortyCharacter[] = [];
  totalHuman = 0;

  constructor(cacheService: CacheService, changeService: ChangeService) {
    cacheService.rickAndMortyCharacters$.subscribe(
      {
        next: v => { 
          this.rickAndMortyCharacters = v;
          this.totalHuman = this.rickAndMortyCharacters.filter(c => this.isTypeHuman(c.type)).length;
        }
      }
    );

    changeService.change$.pipe(
      filter(v => v.objectName === "rickAndMortyCharacters")
    ).subscribe((c => {
      if(c.nameOfProperty !== "type"){
        return;
      }

      const wasHuman = this.isTypeHuman(c.oldValue);
      const isHuman = this.isTypeHuman(c.newValue);

      if(wasHuman === isHuman){
        return;
      }

      isHuman ? this.totalHuman++ : this.totalHuman--;
    }))
  }


  private isTypeHuman(type: string) {
    return type.toUpperCase().includes("HUMAN");
  }
 

}
