export const SET_TASKS='SET_TASKS';

export function setTasks(tasks){
    return {
        type: SET_TASKS,
        tasks
    }
}

export function fetchTasks(){
    return dispatch => {
        let url = 'http://localhost:8000/api/v1/users/11/tasks/';
        let opciones = {
            credentials: 'include',
            method: "GET",
            headers: {
            "content-type": "application/json"
            }
        };

        fetch(url, opciones)
        .then(respuesta => respuesta.json())
        .then(datos => {console.log(datos);dispatch(setTasks(datos.user.tasks))})
        .catch(error => console.log(error));
    }
}