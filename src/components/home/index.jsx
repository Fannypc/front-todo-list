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
import './style.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchTasks, saveTask, deleteTask } from '../../redux/task/taskActions';
import { logout } from '../../redux/auth/actions';
import { fetchStatus } from '../../redux/status/actions';
import classnames from 'classnames';
import '../common/style.css';


toast.configure();
registerLocale('es', es);
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            status: [],
            estatusPeticion: false,
            formData: {
                content: '',
                due_date: new Date(),
                user_id: this.props.user.id,
                status_id: ''
            },
            errors: {}
        };
    }

    componentDidMount(){
        if(this.props.user.isAuthenticated){
            this.props.fetchTasks(this.props.user.id);
            this.props.fetchStatus();
        }
    }

    createTask= event =>{
        event.preventDefault();  
        let errors={};
        if (this.state.formData.content === '') errors.content = "Informar campo"
        if (this.state.formData.status_id === '') errors.status_id = "Informar campo"
        this.setState({errors});
        // const isValid = Object.keys(errors).length === 0

        if (true){
            this.props.saveTask(this.state.formData).then(
                () => {
                    toast.success('Tarea creada con exito');
                    this.resetCreateForm();
                    this.props.fetchTasks();
                },
                (err) => err.response.json().then(({errors}) => this.setState({errors}))
            );
        }

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

    userLogout = () => {
        this.props.logout().then(
            () => {
                this.props.history.push('/login');
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
        if(!!this.state.errors[evento.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[evento.target.name];
    
            this.setState({
                formData: {
                    ...this.state.formData,
                    [evento.target.name]: evento.target.value
                },
                errors
            });
        }else{
            this.setState({
                formData: {
                    ...this.state.formData,
                    [evento.target.name]: evento.target.value
                }
            });
        }

    };

    resetCreateForm = () => { 
        document.getElementById("create-task-form").reset();
    }

    render(){
        return(
            <>
            <NavbarApp user={this.props.user} logoutFn={this.userLogout}/>
            <Row className="justify-content-md-center home-dashboard m-0">
                <Col lg="10">
                    <Card body className='home-card'>
                    <Form onInput={this.setInputValue} onSubmit={this.createTask} id='create-task-form'>
                        <Form.Row>
                            <Col sm={12} xs={12} md={12} xl={7} className={classnames('error', {error: !!this.state.content})}>
                                <Form.Control placeholder="Ingresa tu tarea" name="content" />
                                <span>{this.state.errors.content}</span>
                            </Col>
                            <Col sm={4} xs={4} md={5} xl={2} className="mt-2 mt-xl-0">
                                    <DatePicker 
                                        selected={this.state.formData.due_date} 
                                        onChange={this.handleDatepicker}
                                        name="due_date"
                                        disabled={false}
                                        locale="es"
                                    />
                            </Col>
                            <Col sm={5} xs={4} md={5} xl={2} className={"mt-2 mt-xl-0 "+classnames('error', {error: !!this.state.status_id})}>
                                <Form.Control as="select" custom name="status_id">
                                    <option value="" hidden>Seleccionar</option>
                                    {this.props.status ? this.props.status.map((status)=>(
                                        <option value={status.id} key={status.id}>
                                            {status.name}
                                        </option>
                                    )): <p></p>}
                                </Form.Control>
                                <span>{this.state.errors.status_id}</span>
                            </Col>
                            <Col sm={3} xs={4} md={2} xl={1} className="mt-2 mt-xl-0">
                                <Button type="submit" className="mb-2">
                                    Submit
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                        <div className="task-container">
                            { this.props.tasks && this.props.tasks.length === 0                          
                            ? <p>Aun no tienes tareas.</p>
                                : this.props.tasks.map((task)=>(
                                    <Task 
                                        task={task}
                                        key={task.id}
                                        user={this.props.user}
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
    deleteTask: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return{
        tasks: state.tasks,
        status: state.status,
        user: state.user
    }
}

export default connect(mapStateToProps, {fetchTasks, saveTask, fetchStatus, deleteTask, logout})(Home);