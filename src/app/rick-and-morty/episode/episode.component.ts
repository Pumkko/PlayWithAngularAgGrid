import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { RickAndMortyEpisode } from 'src/app/database/rickAndMortyEpisode';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
})
export class EpisodeComponent {
  rickAndMortyEpisodes: RickAndMortyEpisode[] = [];

  columnDefs: ColDef<RickAndMortyEpisode>[] = [
    {
      headerName: 'Name',
      valueGetter: (params) => params.data?.name,
      flex: 3,
    },
    {
      headerName: 'Created',
      valueGetter: (params) => params.data?.created,
      flex: 1,
    },
    {
      headerName: 'Air Date',

      valueGetter: (params) => params.data?.air_date,
      flex: 1,
    },
    {
      headerName: 'Episode',
      valueGetter: (params) => params.data?.episode,
      flex: 1,
    },
  ];

  defaultColDef: ColDef<RickAndMortyEpisode> = {
    sortable: true,
    filter: true,
  };

  constructor(private rickAndMortyService: CacheService) {
    this.rickAndMortyService.fetchRickAndMortyEpisodesAsync().then((value) => {
      this.rickAndMortyEpisodes = value;
    });
  }
}
