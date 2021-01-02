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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTasks } from '../../redux/task/taskActions';

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            tasks: [],
            status: [],
            estatusPeticion: false,
            formData: {
                due_date: new Date(),
                user_id: "11"
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    resetForm = () => {
        // this.setState({
        //     formData:{
        //         content:'',
        //         due_date: new Date(),
        //         user_id: "11"
        //     }
        // });
        document.getElementById("create-course-form").reset();
    }

    componentDidMount(){
        this.props.fetchTasks();
        this.status();
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

    status = () => {
        let url = 'http://localhost:8000/api/v1/status/';
        let opciones = {
            credentials: 'include',
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
                this.setState({status:datos});
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
        // this.setState({
        //   startDate: date
        // })
        this.setState({
            formData: {
            ...this.state.formData,
            due_date: date
            }
        });
        console.log(this.state.formData);
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

    createTask= evento =>{
        evento.preventDefault();
        
        // let url = 'http://localhost:8000/api/v1/users/2/tasks/';
        let url = "http://localhost:8000/api/v1/tasks/";
        let opciones = {
            method: "POST",
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
            if(this.state.estatusPeticion){
                this.resetCreateForm();
                this.tasks();
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    resetCreateForm = () => { 
        document.getElementById("create-task-form").reset();
    }


    render(){
        return(
            <Container>
                <Row className="justify-content-md-center home-dashboard">
                    <Col lg="10">
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Tareas</Breadcrumb.Item>
                            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                Calendario
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Card body>
                        <Form onInput={this.setInputValue} onSubmit={this.createTask} id='create-task-form'>
                            <Form.Row>
                                <Col xs={6}>
                                    <Form.Control placeholder="City" name="content" />
                                </Col>
                                <Col xs={2}>
                                    {/* <Form.Control placeholder="State" /> */}
                                        <DatePicker 
                                            selected={this.state.formData.due_date} 
                                            onChange={this.handleChange}
                                            name="due_date"
                                            disabled={false}
                                            // dateFormat="MM/dd/yyyy"
                                        />
                                </Col>
                                <Col xs={2}>
                                    <Form.Control as="select" custom name="status_id">
                                        <option value="" selected disabled hidden>Seleccionar</option>
                                        {this.state.status.map((status)=>(
                                            <option value={status.id}>{status.name}</option>
                                        ))}
                                        
                                    </Form.Control>
                                </Col>
                                <Col xs={1}>
                                    <Button type="submit" className="mb-2">
                                        Submit
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                            <div className="">
                                { this.state.tasks.length                           
                                   ? this.state.tasks.map((task)=>(
                                        <Task 
                                            task={task}
                                            status={this.state.status}
                                            deleteTaskFn={this.deleteTask}
                                            tasksFn = {this.tasks}/>
                                    ))
                                    :<p>Aun no tienes tareas.</p>
                                }
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )

    }
}

Home.propTypes = {
    tasks: PropTypes.array.isRequired,
    getTasks: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return{
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, {fetchTasks})(Home);