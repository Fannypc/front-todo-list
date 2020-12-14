import React from 'react';
import './style.css';
import Login from './login';
import Register from './register';
import Loader from '../common/loader';
import Home from '../home/index';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export default class Auth extends React.Component{
    constructor() {
        super();
        this.state = {
          showView: "loader",
          formData:{},
          estatusPeticion:false,
        };
      }

    componentDidMount() {
        setTimeout(() => this.setState({ showView: "login" }), 2000);
    }

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
                return <Login 
                        registerViewFn={this.registerView} 
                        loginFn={this.login} 
                        homeViewFn={this.homeView}
                        setInputValueFn={this.setInputValue}/>;
        }
    }

    notify = () => {
        toast('Basic notification!');
    }

    login = evento => {
        evento.preventDefault();
        let url = "https://academlo-todolist.herokuapp.com/login";
        let opciones = {
            method: "POST",
            headers: {
            "content-type": "application/json"
            },
            body: JSON.stringify(this.state.formData)
        };

        fetch(url, opciones)
        .then(respuesta => {
            return respuesta.json;
        })
        .then(datos => {
            console.log(datos);
        })
        .catch(error => {
            console.log(error);
        });
    };

    register = evento => {
        evento.preventDefault();
        let url = "https://academlo-todolist.herokuapp.com/register";
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


    render(){
        return (
            <div className="auth-container">
                {this.elegirVista()}
            </div>
        );
    }

}