export const SET_USER = 'SET_USER';
export const DO_LOGOUT = 'DO_LOGOUT'

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        console.log('estoy en el error');
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function setUser(data){
    return {
        type: SET_USER,
        data
    }
}

export function doLogout(){
    return {
        type: DO_LOGOUT
    }
}

export function loginUser(data){
    return dispatch => {
        let url = 'https://vast-thicket-80304.herokuapp.com/api/v1/login';
        // let url = "http://localhost:8000/api/v1/login";
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
        .then(data => dispatch(setUser(data)))
    }
}

export function logout(){
    return dispatch => {
        let url = 'https://vast-thicket-80304.herokuapp.com/api/v1/logout';
        // let url = "http://localhost:8000/api/v1/logout";
        let opciones = {
            method: "POST",
            // credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
        };

        return fetch(url, opciones)
        .then(handleResponse)
        .then(data => dispatch(doLogout()))
    }
}