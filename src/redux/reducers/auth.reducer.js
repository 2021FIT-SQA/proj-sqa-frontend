const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'LOGIN':
            return 'hihi';
        default:
            return state;
    }
}

export default authReducer;