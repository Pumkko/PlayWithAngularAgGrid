import { Injectable } from '@angular/core';
import { fromFetch } from 'rxjs/fetch';
import { catchError, interval, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  healthCheck$ = interval(30 * 1000)
    .pipe( switchMap(() => fromFetch('https://api.github.com')))
    .pipe (
      switchMap(() => of(true)),
      catchError(() => of(false))
    )

}
