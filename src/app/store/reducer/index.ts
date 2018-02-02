import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl{
  url: string;
  queryParams: Params;
  params: Params;
}

export interface  State{
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers = {
  routerReducer: fromRouter.routerReducer,
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');


export class CustomSerializer {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;

    while(state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;

    return { url, queryParams, params };
  }
}
