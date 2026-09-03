import {USER_LOGIN, USER_LOGOUT} from '@/actions/types';
import {getKartkatalogApiUrl} from "@/actions/ApiUrlActions";

const initialState = {
    isAuthenticated: false,
    profile: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                profile: action.payload
            };
        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                profile: null
            };
        default:
            return state;
    }
}

export const login  = (redirect) => (dispatch, getState) => {
    const url = `${dispatch(getKartkatalogApiUrl())}/user`;

    return fetch(url)
        .then(response => {
            if (response.status === 403 || response.status === 401) {
                window.location.href = '/login';
            }
            return response.json();
        })
        .then(user => {
            if (user) {
                return dispatch({
                    type: USER_LOGIN,
                    payload: user
                });
            }
        })
        .catch(error => {
            console.error('Failed to fetch user:', error);
        });
};
export const logout = () => ({
    type: USER_LOGOUT
});

export const getUser = () => (dispatch, getState) => {
    const url = `${dispatch(getKartkatalogApiUrl())}/user`;

    return fetch(url)
        .then(response => {
            if (response.status === 403 || response.status === 401) {
                return dispatch({
                    type: USER_LOGOUT
                });
            }
            return response.json();
        })
        .then(user => {
            if (user.Name && user.Email) {
                return dispatch({
                    type: USER_LOGIN,
                    payload: user
                });
            }
        })
        .catch(error => {
            console.error('Failed to fetch user:', error);
        });
};