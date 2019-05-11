import {combineReducers} from 'redux';
import setStateReduxToken from './setTokenRedux';
import errors from './errorReducer';
import authReducer from './authReducer'
const root = combineReducers({
    setStateReduxToken: setStateReduxToken,
    errors, 
    authReducer
});

export default root;