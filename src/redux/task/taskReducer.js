import {SET_TASKS} from './taskActions';

export default function tasks(state=[], action={}){
    switch(action.type){
        case SET_TASKS:
            return action.tasks;
        default: return state;
    }
}