import { combineReducers } from 'redux';
import user from './userReducer'
import search from './searchReducer'
import watchlist from './watchlistReducer'

export default combineReducers({
    user,
    search,
    watchlist
});