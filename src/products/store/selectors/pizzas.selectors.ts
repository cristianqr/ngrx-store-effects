import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';

import { Pizza } from '../../models/pizza.model';

export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const getAllPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);

export const getSelectedPizza = createSelector(
  getAllPizzasEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId]
  }
)

export const getAllPizzas = createSelector(
  getAllPizzasEntities,
  entities => {
    return Object.keys(entities).map(id => entities[+id]);
  }
)
export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);
