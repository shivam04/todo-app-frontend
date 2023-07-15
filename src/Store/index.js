import taskReducer from './TaskStore/TaskStore';
import thunk from 'redux-thunk';

import { combineReducers, createStore, applyMiddleware } from 'redux';

const reducer = combineReducers({
    task: taskReducer
});

let store = createStore(reducer, applyMiddleware(thunk));

export default store;