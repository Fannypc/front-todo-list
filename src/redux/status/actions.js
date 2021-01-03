export const SET_STATUS = 'SET_STATUS';

export function setStatus(status){
    return {
        type: SET_STATUS,
        status
    }
}

export function fetchStatus(){
    return dispatch => {
        let url = 'http://localhost:8000/api/v1/status/';
        let opciones = {
            credentials: 'include',
            method: "GET",
            headers: {
            "content-type": "application/json"
            }
        };

        fetch(url, opciones)
        .then(respuesta => respuesta.json())
        .then(datos => dispatch(setStatus(datos)))
        .catch(error => console.log(error))
    }
}