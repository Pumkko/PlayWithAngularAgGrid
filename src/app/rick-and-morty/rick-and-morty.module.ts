import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { AgGridModule } from 'ag-grid-angular';
import { TotalHumanComponent } from './total-human/total-human.component';



@NgModule({
  declarations: [
    CharacterComponent,
    TotalHumanComponent
  ],
  imports: [
    CommonModule,
    AgGridModule
  ]
})
export class RickAndMortyModule { }
