export default function watchlistReducer (state = {loader: false, watchlistCards: [], selectedCard: null, moreInfo: false}, action) {
    switch (action.type) {
        case "START_ADDING_WATCHLIST_CARDS":
            return {
                ...state, 
                loader: true,
                watchlistCards: state.watchlistCards
            };
        case "ADD_WATCHLIST_CARDS":
            return {
                ...state,
                loader: false,
                watchlistCards: [...action.watchlistCards]
            }
        case "SELECT_CARD":
            return {
                ...state,
                selectedCard: action.card
            }
        case "START_ADDING_SEARCHED_CARD_TO_WATCHLIST":
            return {
                ...state, 
                loader: true
            };
        case "ADD_SEARCHED_CARD_TO_WATCHLIST":
            return {
                ...state,
                loader: false,
                watchlistCards: [...state.watchlistCards, action.newCard]
            }
        case "SUBTRACT_WATCHLIST_CARD":
            return {
                ...state,
                watchlistCards: [...action.watchlistCards]
            }
        case "MORE_INFO":
            return {
                ...state,
                moreInfo: action.moreInfo
            }
        case "LESS_INFO":
            return {
                ...state,
                moreInfo: action.moreInfo
            }
        default:
            return state;
    }
}