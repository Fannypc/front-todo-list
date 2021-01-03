import React from 'react';
import {
    Navbar,
    Nav
} from 'react-bootstrap';
import { BoxArrowInRight } from 'react-bootstrap-icons';

export default class NavbarApp extends React.Component{
    render(){
        return(
            <Navbar className='navbar-home bg-white mb-5'>
                {/* <Navbar.Brand href="#home">Todo-list</Navbar.Brand>
                <Navbar.Brand href="#home">Lista tareas</Navbar.Brand> */}
                <Nav.Link href="#home">Crear</Nav.Link>
                <Nav.Link href="#features">Ver lista</Nav.Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Registrado como: 
                        <a href="#login" title='Cerrar sesión'>
                            {this.props.user.first_name} {this.props.user.last_name}
                        </a>
                    </Navbar.Text>
                    {/* <Button type="button" className="mb-2 d-none" variant="danger"> */}
                    <Navbar.Text className="logout-icon">
                        <BoxArrowInRight/>
                    </Navbar.Text>
                    {/* </Button> */}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}