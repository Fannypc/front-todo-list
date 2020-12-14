import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';


export default class Login extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10 col-xl-8">
                        <div className="card overflow-hidden shadow card-rounded-30">
                            <div className="card-body p-0">
                                <div className="row vh-75">
                                    <div className="col-md-6 justify-content-center align-items-center d-flex">
                                        <div className="p-3">
                                            <div>LOGIN</div>
                                            <Form onInput={this.props.setInputValueFn} onSubmit={this.props.loginFn}>
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
                                                <Button variant="primary" onClick={this.props.notifyFn}>Notificar</Button>
                                                <div>¿No tienes una cuenta? <span className="underlined c-pointer" onClick={this.props.registerViewFn}>Registrarse</span>
                                                <span className="underlined c-pointer" onClick={this.props.homeViewFn}>Home</span></div>
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
        );
    }
}