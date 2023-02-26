import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    CharacterComponent
  ],
  imports: [
    CommonModule,
    AgGridModule
  ]
})
export class RickAndMortyModule { }
