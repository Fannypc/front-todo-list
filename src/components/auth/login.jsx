import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Route, Redirect, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import './style.css';


toast.configure();
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            formData:{},
            estatusPeticion:0
        };
    }

    login = evento => {
        evento.preventDefault();
        // let url = 'http://localhost:8000/api/v1/users/2/tasks/';
        let url = "http://localhost:8000/api/v1/login";
        let opciones = {
            method: "POST",
            // useCredentials: true,
            // withCredentials:true,
            credentials: 'include',
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(this.state.formData)
        };

        fetch(url, opciones)
        .then(respuesta => {
            this.setState({estatusPeticion:respuesta.status});
            return respuesta.json();
        })
        .then(datos => {
            if(this.state.estatusPeticion!==200){
                toast(datos.message);
            }
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
        const {estatusPeticion} = this.state;
        if (estatusPeticion===200){
            return (<Route><Redirect to='/'/></Route>);
        }

        return(
            <div className="auth-container">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10 col-xl-8">
                            <div className="card overflow-hidden shadow card-rounded-30">
                                <div className="card-body p-0">
                                    <div className="row vh-75">
                                        <div className="col-md-6 justify-content-center align-items-center d-flex">
                                            <div className="p-3">
                                                <div>LOGIN</div>
                                                <Form onInput={this.setInputValue} onSubmit={this.login}>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control type="email" name="email" placeholder="Enter email" />
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicPassword">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" name="password" placeholder="Password" />
                                                    </Form.Group>
                                                    <Button variant="primary" type="submit">
                                                        Submit
                                                    </Button>
                                                    <div>
                                                        ¿No tienes una cuenta? 
                                                            <Link className="underlined c-pointer" to="/register">
                                                                Registrarse
                                                            </Link>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                        <div className="col-md-6 auth-img d-none d-md-block"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}