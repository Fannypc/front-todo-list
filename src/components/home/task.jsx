import React from 'react';
import {
    Form, 
    Col, 
    Button,
    Card
} from 'react-bootstrap';
import { Trash, PencilSquare, Check, X } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import {toast} from 'react-toastify';
import '../common/style.css';
import './style.css';
import { connect } from 'react-redux';
import { fetchTasks, updateTask } from '../../redux/task/taskActions';


toast.configure();
registerLocale('es', es);
class Task extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            eventForm: {},
            tasks:[],
            estatusPeticion:false,
            formData:{
                user_id: this.props.user.id,
                due_date: Date.parse(this.props.task.due_date),
                status_id: this.props.task.status.id
            }
        };
        this.handleDatepicker = this.handleDatepicker.bind(this);
    }

    componentDidMount(){
        const datepickers=document.getElementsByClassName('datepicker');
        for (var i=0; i<datepickers.length; i++){
            datepickers[i].setAttribute('disabled', 'true');
        }
    }

    editTask = (evento, id) =>{
        evento.preventDefault();
        this.disable(evento);

        this.props.updateTask(id, this.state.formData).then(
            () => {
                toast.success('Tarea editada con exito');
                this.props.fetchTasks();
            },
            (err) => {console.log('error:');console.log(err);err.response.json().then(({errors}) => console.log(errors))}
        );
    }

    setInputValue = evento => {
        this.setState({
            formData: {
            ...this.state.formData,
            [evento.target.name]: evento.target.value
            }
        });
    };

    handleDatepicker(date) {
        this.setState({
            formData: {
            ...this.state.formData,
            due_date: date
            }
        });
    }

    disable = (event) => {
        var element = event.target;
        var form = element.closest('form');
        var allElements = [].slice.call(form.elements);
        
        var buttons = allElements.filter(el => (
            el.tagName === 'BUTTON'
        ));

        for (var i = 0; i < buttons.length; ++i) {
            buttons[i].classList.toggle('d-none');
        }

        allElements = allElements.filter(el => (
            el.tagName !== 'BUTTON' 
        ));
        for (var j = 0; j < allElements.length; ++j) {
            allElements[j].disabled=!allElements[j].disabled;
        }
    }


    render(){
        if(this.props.task.id){
            return(
                <Card body className="task-card mb-1">
                <Form className="home-task m-0" onInput={this.setInputValue} onSubmit={(e)=> this.editTask(e, this.props.task.id)}>
                    <Form.Row className="task-form">
                        <Col xs={12} md={6}>
                            <Form.Control type="text" placeholder="Normal text" name="content" defaultValue={this.props.task.content} disabled={true}/>
                        </Col>
                        <Col xs={4} md={2} className="mt-2 mt-md-0">
                            <DatePicker
                                selected = {this.state.formData.due_date} 
                                onChange={this.handleDatepicker}
                                name="due_date"
                                className='datepicker'
                                locale="es"
                            />
                        </Col>
                        <Col xs={4} md={2} className="mt-2 mt-md-0">
                            <Form.Control 
                                as="select" 
                                custom 
                                name="status_id" 
                                disabled={true} 
                                value={this.state.formData.status_id}
                                onChange={this.setInputValue}>
                                {this.props.status.map((status)=>(
                                    <option value={status.id} key={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                        <Col xs={4} md={2} className="justify-center padding-task mt-2 mt-md-0">
                            <Button type="button" className="mb-2" onClick={(e) => this.disable(e)}>
                                <PencilSquare/>
                            </Button>
                            <Button type="button" className="mb-2" variant="danger" onClick={() => this.props.deleteTaskFn(this.props.task.id)}>
                                <Trash/>
                            </Button>
                            <Button type="submit" className="mb-2 mr-1 ml-2 d-none" variant="success">
                                <Check/>
                            </Button>
                            <Button type="button" className="mb-2 mr-1 ml-1 d-none" variant="danger" onClick={(e) => this.disable(e)}>
                                <X/>
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
        
                </Card>
            )
        }
    }
}

export default connect(null, {fetchTasks, updateTask})(Task);