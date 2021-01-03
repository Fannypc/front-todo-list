import React from 'react';
import {
    Button, 
    Row,
    Col,
    Card,
    Form
} from 'react-bootstrap';
import Task from './task';
import NavbarApp from './navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import {Route, Redirect, Link} from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchTasks, saveTask, deleteTask } from '../../redux/task/taskActions';
import { fetchStatus } from '../../redux/status/actions';
import '../common/style.css';


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
    }

    componentDidMount(){
        this.props.fetchTasks(this.props.user.id);
        this.props.fetchStatus();
    }

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

    deleteTask = (id)=>{
        this.props.deleteTask(id).then(
            () => {
                toast.success('Tarea eliminada con exito');
                this.props.fetchTasks();
            },
            (err) => err.response.json().then(({errors}) => console.log(errors))
        );
    }

    handleDatepicker = (date) => {
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

    resetCreateForm = () => { 
        document.getElementById("create-task-form").reset();
    }

    render(){
        // if (this.props.user.isAuthenticated){
        //     return (<Route><Redirect to='/'/></Route>);
        // }

        return(
            <>
            <NavbarApp user={this.props.user}/>
            <Row className="justify-content-md-center home-dashboard m-0">
                <Col lg="10">
                    <Card body className='home-card'>
                    <Form onInput={this.setInputValue} onSubmit={this.createTask} id='create-task-form'>
                        <Form.Row>
                            <Col sm={7} xs={12}>
                                <Form.Control placeholder="City" name="content" />
                            </Col>
                            <Col sm={2} xs={4}>
                                    <DatePicker 
                                        selected={this.state.formData.due_date} 
                                        onChange={this.handleDatepicker}
                                        name="due_date"
                                        disabled={false}
                                        locale="es"
                                    />
                            </Col>
                            <Col sm={2} xs={5}>
                                <Form.Control as="select" custom name="status_id">
                                    <option value="" disabled hidden>Seleccionar</option>
                                    {this.props.status.map((status)=>(
                                        <option value={status.id} key={status.id}>
                                            {status.name}
                                        </option>
                                    ))}
                                    
                                </Form.Control>
                            </Col>
                            <Col sm={1} xs={3}>
                                <Button type="submit" className="mb-2">
                                    Submit
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                        <div className="task-container">
                            { this.props.tasks.length === 0                          
                            ? <p>Aun no tienes tareas.</p>
                                : this.props.tasks.map((task)=>(
                                    <Task 
                                        task={task}
                                        key={task.id}
                                        status={this.props.status}
                                        deleteTaskFn={this.deleteTask}/>
                                ))
                            }
                        </div>
                    </Card>
                </Col>
            </Row>
            </>
        )

    }
}

Home.propTypes = {
    tasks: PropTypes.array.isRequired,
    status: PropTypes.array.isRequired,
    fetchTasks: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return{
        tasks: state.tasks,
        status: state.status,
        user: state.user
    }
}

export default connect(mapStateToProps, {fetchTasks, saveTask, fetchStatus, deleteTask})(Home);