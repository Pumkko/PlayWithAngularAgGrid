import { Injectable } from '@angular/core';
import { catchError, map, of, shareReplay, switchMap, timer } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  healthCheck$ = timer(0, 30 * 1000).pipe(
    switchMap(() =>
      fromFetch('https://api.github.com').pipe(
        catchError(() => of(false)),
        map((v) => v !== false)
      )
    ),
    shareReplay(1)
  );
}
