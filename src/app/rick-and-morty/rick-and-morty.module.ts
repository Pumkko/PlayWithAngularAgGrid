import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChangeHistoryComponent } from './change-history/change-history.component';
import { TotalHumanComponent } from './total-human/total-human.component';



@NgModule({
  declarations: [
    CharacterComponent,
    ChangeHistoryComponent,
    TotalHumanComponent
  ],
  imports: [
    CommonModule,
    AgGridModule
  ]
})
export class RickAndMortyModule { }
