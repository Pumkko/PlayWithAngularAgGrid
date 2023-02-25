import { Component } from '@angular/core';
import { CacheService } from 'src/app/cache.service';
import { RickAndMortyCharacter } from 'src/app/database/rickAndMortyCharacter';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {


  rickAndMortyCharacters: RickAndMortyCharacter[] = [];

  constructor(private rickAndMortyService: CacheService) {
    this.rickAndMortyService.characters$.subscribe({
      next: (value) => {
        this.rickAndMortyCharacters = value;
      }
    })

  }


}

