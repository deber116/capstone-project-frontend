export default function usersReducer (state = {loader: false}, action) {
    switch (action.type) {
        case "SIGN_IN":
            return {
                ...state, 
                username: action.username,
                token: action.token,
                userId: action.userId
                
            };
        case "LOGOUT":
            return {
                ...state, 
                username: null,
                userId: null,
                token: null
    };
        default:
            return state;
    }
}