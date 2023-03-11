import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { CharacterComponent } from './character/character.component';
import { SpecieHeaderComponent } from './specie-header/specie-header.component';
import { TotalAlienService } from './total-alien.service';
import { EpisodeComponent } from './episode/episode.component';

@NgModule({
  declarations: [CharacterComponent, SpecieHeaderComponent, EpisodeComponent],
  providers: [TotalAlienService],
  imports: [CommonModule, AgGridModule],
})
export class RickAndMortyModule {}
