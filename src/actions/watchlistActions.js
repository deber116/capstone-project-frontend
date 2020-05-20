export const watchlistCards = authToken => {
    return (dispatch) => {
        dispatch({ type: 'START_ADDING_WATCHLIST_CARDS' });
        
        const getConfigObj = {
            method: "GET",
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Authorization": `Bearer ${authToken}`
            }
        }

        fetch('http://localhost:3001/watchlists', getConfigObj)
        .then(resp => resp.json())
        .then(
            watchlistCards => dispatch({ type: "ADD_WATCHLIST_CARDS", watchlistCards})
        )
        
    };
};

export const subtractWatchlistCard = (card, authToken) => {
    return (dispatch) => {
        const patchConfigObj = {
            method: "PATCH",
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                product_id: card.product_id
            })
        }

        fetch(`http://localhost:3001/watchlists/${card.product_id}`, patchConfigObj)
        .then(resp => resp.json())
        .then(
            watchlistCards => dispatch({ type: "SUBTRACT_WATCHLIST_CARD", watchlistCards})
        )
        
    };
};

export const selectCard = card => {
    return{
        type: "SELECT_CARD",
        card
    }
}
