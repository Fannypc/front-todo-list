import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';


export default class Base extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="auth-container">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10 col-xl-8">
                            <div className="card overflow-hidden shadow card-rounded-30">
                                <div className="card-body p-0">
                                    <div className="row vh-75">
                                        <div className="col-md-6 justify-content-center align-items-center d-flex">
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