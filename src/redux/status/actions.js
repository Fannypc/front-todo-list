export const SET_STATUS = 'SET_STATUS';

export function setStatus(status){
    return {
        type: SET_STATUS,
        status
    }
}

export function fetchStatus(){
    return dispatch => {
        let url = 'https://vast-thicket-80304.herokuapp.com/api/v1/status';
        // let url = 'http://localhost:8000/api/v1/status/';
        let opciones = {
            // credentials: 'include',
            method: "GET",
            headers: {
                "content-type": "application/json",
                'Authorization': 'Bearer '+localStorage.getItem('token'), 
            }
        };

        fetch(url, opciones)
        .then(respuesta => respuesta.json())
        .then(data => dispatch(setStatus(data)))
        .catch(error => console.log(error))
    }
}