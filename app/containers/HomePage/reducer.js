/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { LIST_GET_ITEMS_FULFILLED } from './constants';

export const initialState = fromJS({
  toDoList: [],
  toBuyList: [],
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default homePageReducer;
