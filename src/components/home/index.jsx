import React from 'react';
import {
    Button, 
    Container, 
    Row,
    Col,
    Breadcrumb,
    Card,
    Form
} from 'react-bootstrap';
import Task from './task';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './style.css';

export default class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            tasks:[],
            estatusPeticion:false,
            startDate: new Date(),
            formData:{}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.tasks();
    }

    tasks = () => {
        let url = 'http://localhost:8000/api/v1/users/11/tasks/';
        // let url = "http://localhost:8000/api/v1/users/1/tasks";
        let opciones = {
            credentials: 'include',
            // withCredentials: true,
            method: "GET",
            headers: {
            "content-type": "application/json"
            }
        };

        fetch(url, opciones)
        .then(respuesta => {
            this.setState({estatusPeticion:respuesta.ok});
            return respuesta.json();
        })
        .then(datos => {
            if(this.state.estatusPeticion){
                this.setState({tasks:datos.user.tasks});
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    deleteTask= (id)=>{
        let url = 'http://localhost:8000/api/v1/tasks/'+id;
        let opciones = {
            credentials: 'include',
            method: "DELETE",
            headers: {
            "content-type": "application/json"
            }
        };

        fetch(url, opciones)
        .then(respuesta => {
            this.setState({estatusPeticion:respuesta.ok});
            return respuesta.json();
        })
        .then(datos => {
            if(this.state.estatusPeticion){
                this.tasks();
            }
        })
        .catch(error => {
            console.log(error);
        });
        
    }

    handleChange(date) {
        this.setState({
          startDate: date
        })
    }

    setInputValue = evento => {
        this.setState({
            formData: {
            ...this.state.formData,
            [evento.target.name]: evento.target.value
            }
        });
        console.log(this.state.formData);
    };

    render(){
        return(
            <Container>
                <Row className="justify-content-md-center home-dashboard">
                    <Col lg="10" className="black">
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Tareas</Breadcrumb.Item>
                            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                Calendario
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Card body>
                        <Form onInput={this.setInputValue}>
                            <Form.Row>
                                <Col xs={7}>
                                    <Form.Control placeholder="City" />
                                </Col>
                                <Col xs={2}>
                                    {/* <Form.Control placeholder="State" /> */}
                                        <DatePicker 
                                            selected={this.state.startDate} 
                                            onChange={this.handleChange}
                                            name="due_date"
                                            // dateFormat="MM/dd/yyyy"
                                        />
                                </Col>
                                <Col>
                                    <Form.Control as="select" custom name="status">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Button type="submit" className="mb-2">
                                        Submit
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                            <div className="">
                                {this.state.tasks.map((task)=>(
                                    <Task 
                                        task={task}
                                        deleteTaskFn={this.deleteTask}/>
                                ))}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )

    }
}