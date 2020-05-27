export default function watchlistReducer (state = {loader: false, watchlistCards: [], portfolios: [], selectedCard: null, moreInfo: false, watchlistToggle: "cards"}, action) {
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
        case "GET_PORTFOLIOS":
            return {
                ...state,
                loader: false,
                portfolios: [...action.portfolios]
            }
        case "START_ADDING_PORTFOLIOS":
            return {
                ...state, 
                loader: true,
                portfolios: state.portfolios
            };
        case "DELETE_PORTFOLIO":
            return {
                ...state, 
                portfolios: action.portfolios
            };
        case "TOGGLE_WATCHLIST":
            return {
                ...state, 
                watchlistToggle: action.watchlistToggle
            };
        default:
            return state;
    }
}