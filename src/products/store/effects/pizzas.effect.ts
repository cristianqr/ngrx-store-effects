import {Injectable} from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import { PizzasService } from '../../services/pizzas.service';
import * as pizzaActions from '../actions/pizzas.action';

@Injectable()
export class PizzasEffect {
  constructor (
    private actions$: Actions,
    private pizzasService: PizzasService
  ) { }

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzasService.getPizzas()
          .pipe(
            map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
            catchError (error => of(new pizzaActions.LoadPizzasFail(error)))
          )
      })
    )
}
