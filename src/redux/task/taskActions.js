export const SET_TASKS = 'SET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const TASK_UPDATED = 'TASK_UPDATED';
export const TASK_DELETED = 'TASK_DELETED';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function setTasks(tasks){
    return {
        type: SET_TASKS,
        tasks
    }
}

export function addTask(task){
    return {
        type: ADD_TASK,
        task
    }
}

export function taskUpdated(task){
    return {
        type: TASK_UPDATED,
        task
    }
}

export function taskDeleted(taskId){
    return {
        type: TASK_DELETED,
        taskId
    }
}

export function saveTask(data){
    return dispatch => {
        let url = "http://localhost:8000/api/v1/tasks/";
        let opciones = {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        };

        return fetch(url, opciones)
                .then(handleResponse)
                .then(data => dispatch(addTask(data.task)))
    }
}

export function updateTask(id, data){
    return dispatch => {
        let url = "http://localhost:8000/api/v1/tasks/"+id;
        let opciones = {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        };

        return fetch(url, opciones)
                .then(handleResponse)
                .then(data => dispatch(taskUpdated(data)))
    }
}

export function deleteTask(taskId){
    return dispatch => {
        let url = 'http://localhost:8000/api/v1/tasks/'+taskId;
        let opciones = {
            credentials: 'include',
            method: "DELETE",
            headers: {
            "content-type": "application/json"
            }
        };

        return fetch(url, opciones)
        .then(handleResponse)
        .then(datos => dispatch(taskDeleted(taskId)))
        .catch(error => console.log(error));
    }
}

export function fetchTasks(userId){
    return dispatch => {
        let url = 'http://localhost:8000/api/v1/users/'+userId+'/tasks/';
        let opciones = {
            credentials: 'include',
            method: "GET",
            headers: {
            "content-type": "application/json"
            }
        };

        fetch(url, opciones)
        .then(respuesta => respuesta.json())
        .then(datos => dispatch(setTasks(datos.user.tasks)))
        .catch(error => console.log(error));
    }
}