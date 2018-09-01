/*
 *
 * HomePage actions
 *
 */

import { ADD_ITEM, GET_ITEMS, DELETE_ITEM } from './constants';

export function addItem(listId, item) {
  return {
    type: ADD_ITEM,
    payload: {
      listId,
      item,
    },
  };
}

export function getList(listId) {
  return {
    type: GET_ITEMS,
    payload: listId,
  };
}

export function deleteItem(listId, itemId) {
  return {
    type: DELETE_ITEM,
    payload: {
      listId,
      itemId,
    },
  };
}

