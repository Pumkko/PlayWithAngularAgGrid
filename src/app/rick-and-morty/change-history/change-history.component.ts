import { Component } from '@angular/core';
import { filter } from 'rxjs';
import { ChangeService, RickAndMortyCharacterChange } from 'src/app/change.service';

@Component({
  selector: 'app-change-history',
  templateUrl: './change-history.component.html',
  styleUrls: ['./change-history.component.scss']
})
export class ChangeHistoryComponent {


  rickAndMortyCharacterChange: RickAndMortyCharacterChange[] = [];


  constructor(changeService: ChangeService){
    changeService.change$.pipe(
      filter(v => v.objectName === "rickAndMortyCharacters")
    ).subscribe(v => {
      this.rickAndMortyCharacterChange.push(v as RickAndMortyCharacterChange);
    });
  }

}
