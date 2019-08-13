import {combineReducers} from 'redux';
import authReducer from './authReducer';
import dictValueReducer from './dictValueReducer';

export default combineReducers({
    auth: authReducer,
    dictValue: dictValueReducer,
});