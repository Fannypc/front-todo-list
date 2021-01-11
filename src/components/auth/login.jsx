import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Route, Redirect, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import './style.css';
import { loginUser } from '../../redux/auth/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';


toast.configure();
class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            formData:{
                email: '',
                password: ''
            },
            estatusPeticion: 0,
            errors: {}
        };
    }

    login = evento => {
        evento.preventDefault();        
        this.props.loginUser(this.state.formData).then(
            () => {},
            (err) => err.response.json().then(({errors}) => {this.setState({errors});
                console.log(this.state.errors); 
                toast.error(this.state.errors.message);
                this.resetForm();
                this.setState({
                    formData:{
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
        document.getElementById("login-form").reset();
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
                                            <div className="p-3">
                                                <div>LOGIN</div>
                                                <Form onInput={this.setInputValue} onSubmit={this.login} id="login-form">
                                                    <Form.Group controlId="formBasicEmail" className={classnames('error', {error: !!this.state.email})}>
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control type="email" name="email" placeholder="Enter email" />
                                                        <span>{this.state.errors.email}</span>
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicPassword" className={classnames('error', {error: !!this.state.password})}>
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control type="password" name="password" placeholder="Password" />
                                                        <span>{this.state.errors.password}</span>
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, {loginUser})(Login);