import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CacheService } from 'src/app/cache.service';
import { RickAndMortyCharacter } from 'src/app/database/rickAndMortyCharacter';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {

  rickAndMortyCharacters: RickAndMortyCharacter[] = [];

  columnDefs: ColDef<RickAndMortyCharacter>[] = [
    {
      headerName: "Name",
      valueGetter: (params) => params.data?.name,
      flex: 3
    },
    {
      headerName: "Origin",
      valueGetter: (params) => params.data?.origin.name,
      flex: 1
    },
    {
      headerName: "Type",
      valueGetter: (params) => params.data?.type,
      flex: 1
    },
    {
      headerName: "Created",
      valueGetter: (params) => params.data?.created,
      flex: 1
    }

  ];

  defaultColDef: ColDef<RickAndMortyCharacter> = {
    sortable: true,
    filter: true,
  };
  
  constructor(private rickAndMortyService: CacheService) {
    this.rickAndMortyService.fetchRickAndMortyCharactersAsync().then((value) => {
      this.rickAndMortyCharacters = value;
    });
  }
}

