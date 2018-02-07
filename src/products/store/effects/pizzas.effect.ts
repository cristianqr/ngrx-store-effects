import {Injectable} from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
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
    );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
      map((action: pizzaActions.CreatePizza) => action.payload),
      switchMap(pizza => {
        return this.pizzasService
          .createPizza(pizza)
          .pipe(
            map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
            catchError(error => of (new pizzaActions.CreatePizzaFail(error)))
          )
      })
    );

  @Effect()
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
      map((pizza) => {
        return new fromRoot.Go({
          path: ['/products', pizza.id]
        });
      })
    );
  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA)
    .pipe(
      map((action: pizzaActions.UpdatePizza) => action.payload),
      switchMap(pizza => {
        return this.pizzasService
          .updatePizza(pizza)
          .pipe(
            map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
          )
      })
    )

  @Effect()
  removePizza$ = this.actions$
    .ofType(pizzaActions.REMOVE_PIZZA)
    .pipe(
      map((action: pizzaActions.RemovePizza) => action.payload),
      switchMap(pizza => {
        return this.pizzasService.removePizza(pizza)
          .pipe(
            map(() => new pizzaActions.RemovePizzaSuccess(pizza)),
            catchError(error => of (new pizzaActions.RemovePizzaFail(error)))
          )
      })
    );

  @Effect()
  handlePizzaSuccess$ = this.actions$
    .ofType(
      pizzaActions.UPDATE_PIZZA_SUCCESS,
      pizzaActions.REMOVE_PIZZA_SUCCESS
    )
    .pipe(
      map((pizza) => {
        return new fromRoot.Go({
          path: ['/products']
        });
      })
    )
}
