import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import spinnerReducer from './reducers/spinnerReducer';
import userReducer from "./reducers/userReducer";
import instructorReducer from "./reducers/instructorReducer";

const rootReducer = combineReducers({
    spinner: spinnerReducer,
    user: userReducer,
    instructor: instructorReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export default store;