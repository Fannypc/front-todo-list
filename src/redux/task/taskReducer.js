import {SET_TASKS, ADD_TASK, TASK_UPDATED, TASK_DELETED} from './taskActions';

export default function tasks(state=[], action={}){
    switch(action.type){
        case SET_TASKS:
            return action.tasks;
        case ADD_TASK:
            return[
                ...state,
                action.task
            ];
        case TASK_UPDATED:
            return state.map(item => {
                if (item.id===action.task.id) return action.task;
                return item
            });
        case TASK_DELETED:
            return state.filter(item => item.id !== action.taskId);
        default: return state;
    }
}