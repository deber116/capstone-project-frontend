export default function searchReducer (state = {loader: false, searchedCards: []}, action) {
    switch (action.type) {
        case "START_ADDING_SEARCHED_CARDS":
            return {
                ...state, 
                loader: true,
                searchedCards: state.searchedCards
            };
        case "ADD_SEARCHED_CARDS":
            return {
                ...state,
                loader: false,
                searchedCards: action.searchedCards
            }
        default:
            return state;
    }
}