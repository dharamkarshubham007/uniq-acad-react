import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import spinnerReducer from './reducers/spinnerReducer';
import userReducer from "./reducers/userReducer";
import toasterReducer from "./reducers/ToasterReducer";

const rootReducer = combineReducers({
    spinner: spinnerReducer,
    user: userReducer,
    toaster: toasterReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export default store;