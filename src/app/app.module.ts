import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CharacterComponent } from './rick-and-morty/character/character.component';
import { RickAndMortyModule } from './rick-and-morty/rick-and-morty.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'rick-and-morty', component: CharacterComponent },
      { path: '', redirectTo: '/rick-and-morty', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ]),
    AgGridModule,
    RickAndMortyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
