
export const login = ({email, password}) => async (dispatch) => {
    try {
        dispatch({
            type: 'TYPE',
            payload: {email, password}
        })
    } catch (error) {
        console.log(error)
    }
}