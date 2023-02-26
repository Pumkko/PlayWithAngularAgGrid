import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChangeHistoryComponent } from './change-history/change-history.component';



@NgModule({
  declarations: [
    CharacterComponent,
    ChangeHistoryComponent
  ],
  imports: [
    CommonModule,
    AgGridModule
  ]
})
export class RickAndMortyModule { }
