import { combineReducers } from 'redux';
import productReducer from './reducer';

//CombineReducers
const rootReducer = combineReducers({
    product: productReducer,
});

export default rootReducer;
