import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Route, Redirect, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../redux/auth/actions';
import {toast} from 'react-toastify';


toast.configure();
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            formData:{
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            }
        };
    }

    register = evento => {
        evento.preventDefault();
        this.props.registerUser(this.state.formData).then(
            () => {},
            (err) => err.response.json().then(({errors}) => {this.setState({errors});
                toast.error(this.state.errors.message);
                this.resetForm();
                this.setState({
                    formData:{
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: ''
                    }
                });
            })
        );
        
    };

    setInputValue = evento => {
        this.setState({
            formData: {
            ...this.state.formData,
            [evento.target.name]: evento.target.value
            }
        });
    };

    resetForm = () => { 
        document.getElementById("register-form").reset();
    }


    render(){
        if (this.props.user.isAuthenticated){
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
                                        <div className="p-4">
                                            <div>REGISTRO</div>
                                            <Form onInput={this.setInputValue} onSubmit={this.register} id="register-form">
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control type="text" name="first_name" placeholder="Ingresa tu nombre" />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Apellidos</Form.Label>
                                                    <Form.Control type="text" name="last_name" placeholder="Ingresa tus apellidos" />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Correo</Form.Label>
                                                    <Form.Control type="email" name="email" placeholder="Ingresa tu correo" />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Contraseña</Form.Label>
                                                    <Form.Control type="password" name="password" placeholder="Ingresa tu contraseña" />
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                    Registrarse
                                                </Button>
                                                <div>
                                                    <span>¿Ya tienes cuenta? </span>
                                                    <Link className="underlined c-pointer" to="/login">Entra</Link>
                                                </div>
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
            </div>
        );
    }

}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, {registerUser})(Register);