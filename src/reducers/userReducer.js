export default function usersReducer (state = {loader: false}, action) {
    switch (action.type) {
        case "SIGN_IN":
            return {
                ...state, 
                loader: true,
                username: action.username,
                token: action.token,
                userId: action.userId
                
            };
        case "LOGOUT":
            return {
                ...state, 
                username: null,
                userId: null,
                loader: false
    };
        default:
            return state;
    }
}