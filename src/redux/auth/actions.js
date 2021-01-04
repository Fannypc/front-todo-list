export const SET_USER = 'SET_USER';
export const DO_LOGOUT = 'DO_LOGOUT'

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function setUser(user){
    return {
        type: SET_USER,
        user
    }
}

export function doLogout(){
    return {
        type: DO_LOGOUT
    }
}

export function loginUser(data){
    return dispatch => {
        let url = "http://localhost:8000/api/v1/login";
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
        .then(datos => dispatch(setUser(datos.user)))
        .catch(error => console.log('el error es'+error))
    }
}

export function logout(){
    return dispatch => {
        let url = "http://localhost:8000/api/v1/logout";
        let opciones = {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        };

        return fetch(url, opciones)
        .then(handleResponse)
        .then(datos => dispatch(doLogout()))
        .catch(error => console.log('el error es'+error))
    }
}