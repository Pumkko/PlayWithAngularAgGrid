import { Component } from '@angular/core';
import { DataService, RickAndMortyCharacter } from 'src/app/data.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {


  rickAndMortyCharacters: RickAndMortyCharacter[] = [];

  constructor(private rickAndMortyService: DataService) {
    this.rickAndMortyService.characters$.subscribe({
      next: (value) => {
        this.rickAndMortyCharacters = value.results;
      }
    })

  }


}

