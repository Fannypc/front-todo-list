import {SET_USER, DO_LOGOUT} from './actions';

export default function user(state=[], action={}){
    switch(action.type){
        case SET_USER:
            return {...action.user, isAuthenticated: true};
        case DO_LOGOUT:
            return state=[{isAuthenticated: false}]
        default: return state;
    }
}