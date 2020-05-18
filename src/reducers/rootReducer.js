import { combineReducers } from 'redux';
import user from './userReducer'
import search from './searchReducer'

export default combineReducers({
    user,
    search
});