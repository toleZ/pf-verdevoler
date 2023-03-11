import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { entitiesReducer } from './reducers/entitiesReducer';
import { usersReducer } from './reducers/usersReducer';
import { acountReducer } from './reducers/acountReducer';

const reducers = combineReducers({
  entitiesReducer,
  usersReducer,
  acountReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
