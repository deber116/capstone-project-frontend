export default function searchReducer (state = {loader: false, searchedCards: [], searching: false}, action) {
    switch (action.type) {
        case "START_ADDING_SEARCHED_CARDS":
            return {
                ...state, 
                loader: true,
                searching: true,
                searchedCards: state.searchedCards
            };
        case "ADD_SEARCHED_CARDS":
            return {
                ...state,
                loader: false,
                searchedCards: action.searchedCards
            }
        case "CLEAR_SEARCH":
            return {
                ...state,
                searching: false,
                searchedCards: []
            }
        default:
            return state;
    }
}