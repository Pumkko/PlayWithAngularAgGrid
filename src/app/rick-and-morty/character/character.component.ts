import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CacheService } from 'src/app/cache.service';
import { ChangeService } from 'src/app/change.service';
import { RickAndMortyCharacter } from 'src/app/database/rickAndMortyCharacter';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent {
  rickAndMortyCharacters: RickAndMortyCharacter[] = [];

  gridApi?: GridApi;

  columnDefs: ColDef<RickAndMortyCharacter>[] = [
    {
      headerName: 'Name',
      valueGetter: (params) => params.data?.name,
      flex: 3,
    },
    {
      headerName: 'Origin',
      valueGetter: (params) => params.data?.origin.name,
      flex: 1,
    },
    {
      headerName: 'Species',
      valueGetter: (params) => params.data?.species,
      flex: 1,
    },
    {
      headerName: 'Type',
      editable: true,
      valueGetter: (params) => params.data?.type,
      valueSetter: (params) => {
        if (params.oldValue === params.newValue) {
          return false;
        }

        params.data.type = params.newValue;

        this.changeService.pushChangeAsync({
          objectName: 'rickAndMortyCharacters',
          id: params.data.id,
          nameOfProperty: 'type',
          newValue: params.newValue,
          oldValue: params.oldValue,
        });
        return true;
      },
      flex: 1,
    },
    {
      headerName: 'Created',
      valueGetter: (params) => params.data?.created,
      flex: 1,
    },
  ];

  defaultColDef: ColDef<RickAndMortyCharacter> = {
    sortable: true,
    filter: true,
  };

  /**DbUpdater do better, it was a quick and dirty just to try */
  constructor(
    private rickAndMortyService: CacheService,
    private changeService: ChangeService
  ) {
    this.rickAndMortyService
      .fetchRickAndMortyCharactersAsync()
      .then((value) => {
        this.rickAndMortyCharacters = value;
      });
  }

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
  }

  onTurnIntoAlien() {
    this.rickAndMortyCharacters.forEach(async (c) => {
      await this.changeService.pushChangeAsync({
        objectName: 'rickAndMortyCharacters',
        id: c.id,
        nameOfProperty: 'species',
        newValue: 'Alien',
        oldValue: c.species,
      });
      c.species = 'Alien';
    });

    this.gridApi && this.gridApi.refreshCells();
  }

  onRefresh() {
    this.rickAndMortyService
      .fetchRickAndMortyCharactersAsync(true)
      .then((value) => {
        this.rickAndMortyCharacters = value;
      });
  }
}
