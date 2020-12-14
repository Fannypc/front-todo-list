import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Register extends React.Component{
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
                                <div className="p-4">
                                    <div>REGISTRO</div>
                                    <Form onInput={this.props.setInputValueFn} onSubmit={this.props.registerFn}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type="text" name="name" placeholder="Ingresa tu nombre" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Apellidos</Form.Label>
                                            <Form.Control type="text" name="lastname" placeholder="Ingresa tus apellidos" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name="email" placeholder="Ingresa tu email" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control type="password" name="password" placeholder="Ingresa tu contraseña" />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                        <div>¿Ya tienes cuenta? <span className="underlined c-pointer" onClick={this.props.loginViewFn}>Entra</span></div>
                                    </Form>
                                </div>
                            </div>
                            <div className="col-md-6 auth-img d-none d-md-block">
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