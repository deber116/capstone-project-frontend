export const searchCards = (searchTerm, authToken) => {
    return (dispatch) => {
        dispatch({ type: 'START_ADDING_CARDS' });
        
        const postConfigObj = {
            method: "POST",
            headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                search_term: searchTerm
            })
        }

        fetch('http://localhost:3001/cards', postConfigObj)
        .then(resp => resp.json())
        .then(
            //console.log(response)
            searchedCards => dispatch({ type: "ADD_SEARCHED_CARDS", searchedCards})
        )
        
    };
};

