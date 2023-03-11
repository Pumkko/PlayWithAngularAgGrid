import { Injectable } from '@angular/core';
import { fromFetch } from 'rxjs/fetch';
import { catchError, interval, map, of, share, shareReplay, switchMap, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {


  healthCheck$ = timer(0, 30 * 1000)
    .pipe( 
      switchMap(() => 
        fromFetch('https://api.github.com')
          .pipe(
            catchError(() => of(false)),
            map(v => v !== false)
          )
      ),
      shareReplay(1))
    
}
