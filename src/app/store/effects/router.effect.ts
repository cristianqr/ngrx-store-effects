import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions } from '@ngrx/effects';
import * as routerActions from '../actions/router.action';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor (
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({dispatch: false})
  navigate$ = this.actions$
    .ofType(routerActions.GO)
    .pipe(
      map((action: routerActions.Go) => action.payload),
      tap(({path, query: queryParams, extras}) => {
        this.router.navigate(path, {queryParams, ...extras});
      })
    );

  @Effect({dispatch: false})
  navigateBack$ = this.actions$
    .ofType(routerActions.BACK)
    .pipe(tap(() => this.location.back()));

  @Effect({dispatch: false})
  navigateForward$ = this.actions$
    .ofType(routerActions.FORWARD)
    .pipe(tap(() => this.location.forward()));
}
