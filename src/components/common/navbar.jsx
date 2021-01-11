import React from 'react';
import {
    Navbar
} from 'react-bootstrap';
import { BoxArrowInRight } from 'react-bootstrap-icons';

export default class NavbarApp extends React.Component{
    render(){
        return(
            <Navbar className='navbar-home bg-white mb-5'>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Registrado como: 
                        <a href="#login" title='Cerrar sesión'>
                            {` ${this.props.user.first_name} ${this.props.user.last_name}`}
                        </a>
                    </Navbar.Text>
                    <Navbar.Text className="logout-icon" title="Cerrar sesión" onClick={this.props.logoutFn}>
                        <BoxArrowInRight/>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}