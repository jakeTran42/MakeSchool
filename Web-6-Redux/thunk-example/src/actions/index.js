export const GET_JOKE = "GET_JOKE"

export const displayJoke = (obj) => {
    console.log("Displaying joke")
    console.log(obj)
    return {
        type: GET_JOKE,
        payload: { obj }
    }
}

export const getJoke = () => {
    console.log("Fetching Joke")
    return (dispatch) => {
        fetch('http://api.icndb.com/jokes/random').then((res) => {
            return res.json()
        }).then((json) => {
            dispatch(displayJoke(json))
        }).catch((err) => {
            dispatch(displayJoke(err))
        })
    }
}
