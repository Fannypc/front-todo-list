import {combineReducers} from 'redux';
import tasks from './task/taskReducer';
import status from './status/reducer';
import user from './auth/reducer';

export default combineReducers({
    tasks,
    status,
    user
});