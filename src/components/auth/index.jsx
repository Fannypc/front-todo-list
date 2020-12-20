import React from 'react';
import useHistory from 'react';
import './style.css';
import Login from './login';
import Register from './register';
import Loader from '../common/loader';
import Home from '../home/index';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


toast.configure();
export default class Auth extends React.Component{

    constructor() {
        super();
        this.state = {
          showView: "login",
          formData:{},
          estatusPeticion:false,
        };

        
      }

    // componentDidMount() {
    //     setTimeout(() => this.setState({ showView: "home" }), 2000);
    // }

    registerView = () => {
        this.setState({showView:"register"});
    }  

    loginView = () => {
        this.setState({showView:"login"});
    }
    
    homeView = () => {
        this.setState({showView:"home"});
    }

    elegirVista = () => {
        switch(this.state.showView){
            case "loader":
                return <Loader/>
            case "login":
                return <Login 
                        registerViewFn={this.registerView} 
                        loginFn={this.login} 
                        setInputValueFn={this.setInputValue}
                        homeViewFn={this.homeView}
                        notifyFn={this.notify}/>;
            case "register":
                return <Register 
                        loginViewFn={this.loginView} 
                        registerFn={this.register} 
                        setInputValueFn={this.setInputValue}/>;
            case "home":
                return <Home
                        loginViewFn={this.loginView}
                        registerFn={this.register}
                        setInputValueFn={this.setInputValue}/>;
            default:
                return <Home
                        loginViewFn={this.loginView}
                        registerFn={this.register}
                        setInputValueFn={this.setInputValue}/>;
        }
    }

    notify = () => {
        toast('Basic notification!');
    }


    login = evento => {
        evento.preventDefault();
        let url = "http://localhost:8000/api/v1/login";
        let opciones = {
            method: "POST",
            headers: {
            "content-type": "application/json"
            },
            body: JSON.stringify(this.state.formData)
        };

        fetch(url, opciones)
        .then(respuesta => {
            this.setState({estatusPeticion:respuesta.ok});
            return respuesta.json();
        })
        .then(datos => {
            if(this.state.estatusPeticion){
                toast(datos.message);
                console.log(datos.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };


    register = evento => {
        evento.preventDefault();
        let url = "http://localhost:8000/api/v1/register";
        let opciones = {
            method: "POST",
            headers: {
            "content-type": "application/json"
            },
            body: JSON.stringify(this.state.formData)
        };

        fetch(url, opciones)
        .then(respuesta => {
            this.setState({estatusPeticion:respuesta.ok});
            console.log(respuesta.status);
            return respuesta.json();
        })
        .then(datos => {
            console.log(datos.message);
            if(this.state.estatusPeticion){
                toast(datos.message);
            }
            console.log(datos);
        })
        .catch(error => {
            console.log(error);
        });
    };

    setInputValue = evento => {
        this.setState({
            formData: {
            ...this.state.formData,
            [evento.target.name]: evento.target.value
            }
        });
    };

    async fetchAPI(methodType, url, data){
        try {
            let result = await fetch(url, {
                method: methodType,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)  
            }); // wait until request is done
            let responseOK = result && result.ok;
            if (responseOK) {
                let data = await result.json();
                // do something with data
                return data;
            } else {
                return result;
            }
        } catch (error) {
            // log your error, you can also return it to handle it in your calling function
        }
    }

    render(){
        return (
            <div className="auth-container">
                {this.elegirVista()}
            </div>
        );
    }

}