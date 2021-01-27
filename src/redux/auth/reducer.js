import {SET_USER, DO_LOGOUT} from './actions';

export default function user(state=[], action={}){
    switch(action.type){
        case SET_USER:
            window.localStorage.setItem('token', action.data.token)
            return {...action.data.user, isAuthenticated: true};
        case DO_LOGOUT:
            window.localStorage.clear();
            // return state={...action.user, isAuthenticated: false};
            // return state=[{user: {isAuthenticated: false}}];
            return state = []
        default: return state;
    }
}