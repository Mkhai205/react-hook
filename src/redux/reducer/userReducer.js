import { DECREMENT } from "../action/counterAction";
import { FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGOUT_SUCCESS } from "../action/userAction";
const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        username: "",
        image: "",
        role: "",
        email: "",
    },
    isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: action?.payload?.access_token,
                    refresh_token: action?.payload?.refresh_token,
                    username: action?.payload?.username,
                    image: action?.payload?.image,
                    role: action?.payload?.role,
                    email: action?.payload?.email,
                },
                isAuthenticated: true,
            };

        case FETCH_USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: "",
                    refresh_token: "",
                    username: "",
                    image: "",
                    role: "",
                    email: "",
                },
                isAuthenticated: false,
            };

        case DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
};

export default userReducer;
