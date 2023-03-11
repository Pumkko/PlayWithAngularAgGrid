import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { CharacterComponent } from './character/character.component';
import { EpisodeComponent } from './episode/episode.component';
import { SpecieHeaderComponent } from './specie-header/specie-header.component';
import { TotalAlienService } from './total-alien.service';

@NgModule({
  declarations: [CharacterComponent, SpecieHeaderComponent, EpisodeComponent],
  providers: [TotalAlienService],
  imports: [
    CommonModule,
    AgGridModule,
    RouterModule.forChild([
      { path: 'rick-and-morty-characters', component: CharacterComponent },
      { path: 'rick-and-morty-episodes', component: EpisodeComponent },
    ]),
  ],
})
export class RickAndMortyModule {}
