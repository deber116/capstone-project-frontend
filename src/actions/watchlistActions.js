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

export const getPortfolios = authToken => {
    return dispatch => {
        dispatch({ type: 'START_ADDING_PORTFOLIOS' });
        const getConfigObj = {
            method: "GET",
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Authorization": `Bearer ${authToken}`
            }
        }

        fetch('http://localhost:3001/portfolios', getConfigObj)
        .then(resp => resp.json())
        .then(
            portfolios => {
                console.log(portfolios)
                dispatch({ type: "GET_PORTFOLIOS", portfolios})
            }
        )
        
    };
}

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

export const deletePortfolio = (portfolio, authToken) => {
    return dispatch => {
        const deleteConfigObj = {
            method: "DELETE",
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                id: portfolio.id
            })
        }

        fetch(`http://localhost:3001/portfolios/${portfolio.id}`, deleteConfigObj)
        .then(resp => resp.json())
        .then(
            portfolios => dispatch({ type: "DELETE_PORTFOLIO", portfolios})
        )
    }
}

export const moreInfo = () => {
    return{
        type: "MORE_INFO",
        moreInfo: true
    }
}

export const lessInfo = () => {
    return{
        type: "LESS_INFO",
        moreInfo: false
    }
}

export const selectCard = card => {
    return{
        type: "SELECT_CARD",
        card
    }
}
