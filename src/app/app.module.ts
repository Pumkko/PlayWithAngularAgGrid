import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CharacterComponent } from './rick-and-morty/character/character.component';
import { EpisodeComponent } from './rick-and-morty/episode/episode.component';
import { RickAndMortyModule } from './rick-and-morty/rick-and-morty.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'rick-and-morty-characters', component: CharacterComponent },
      { path: 'rick-and-morty-episodes', component: EpisodeComponent },
      { path: '', redirectTo: '/rick-and-morty-characters', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ]),
    AgGridModule,
    RickAndMortyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
