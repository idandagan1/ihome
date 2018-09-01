import { takeEvery, call, put, select, all } from 'redux-saga/effects';

import { services } from '../../app';
// import { GET_ITEMS } from './constants';
const GET_ITEMS = 'app/HomePage/GET_ITEMS';

function* handleGetItems(action) {
  const { payload } = action;
  yield put(yield call(services.list.get, payload));
}

function* createGetListsWatcher() {
  yield takeEvery(GET_ITEMS, handleGetItems);
}
// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    createGetListsWatcher(),
  ]);
}
