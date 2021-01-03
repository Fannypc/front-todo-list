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
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import './style.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
// import store from './redux/store';
import { fetchTasks, saveTask } from '../../redux/task/taskActions';


toast.configure();
registerLocale('es', es);
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

    componentDidMount(){
        this.props.fetchTasks();
        this.status();
    }

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
        this.setState({
            formData: {
            ...this.state.formData,
            due_date: date
            }
        });
    }

    setInputValue = evento => {
        this.setState({
            formData: {
            ...this.state.formData,
            [evento.target.name]: evento.target.value
            }
        });
    };

    createTask= event =>{
        event.preventDefault();
        
        this.props.saveTask(this.state.formData).then(
            () => {
                toast.success('Tarea creada con exito');
                this.resetCreateForm();
                this.props.fetchTasks();
            },
            (err) => err.response.json().then(({errors}) => console.log(errors))
        );
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
                                            locale="es"
                                            // dateFormat="MM/dd/yyyy"
                                        />
                                </Col>
                                <Col xs={2}>
                                    <Form.Control as="select" custom name="status_id">
                                        <option value="" disabled hidden>Seleccionar</option>
                                        {this.state.status.map((status)=>(
                                            <option value={status.id} key={status.id}>
                                                {status.name}
                                            </option>
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
                                { this.props.tasks.length === 0                          
                                   ? <p>Aun no tienes tareas.</p>
                                    : this.props.tasks.map((task)=>(
                                        <Task 
                                            task={task}
                                            key={task.id}
                                            status={this.state.status}
                                            deleteTaskFn={this.deleteTask}
                                            tasksFn = {this.tasks}/>
                                    ))
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

export default connect(mapStateToProps, {fetchTasks, saveTask})(Home);