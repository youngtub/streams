import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import test from './test';
import user from './user';

const rootReducer = combineReducers({
  test,
  user,
  router: routerReducer
});

export default rootReducer;
