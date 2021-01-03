import React from 'react';
import {
    Form, 
    Col, 
    Button,
    Container
} from 'react-bootstrap';
import { ArrowRight, Trash, PencilSquare } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import {toast} from 'react-toastify';
import '../common/style.css';
import { connect } from 'react-redux';
import { updateTask } from '../../redux/task/taskActions';


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
                user_id: "11",
                due_date: Date.parse(this.props.task.due_date),
                status_id: this.props.task.status.id
            }
        };
        this.handleChange = this.handleChange.bind(this);
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
                // this.props.fetchTasks();
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

    handleChange(date) {
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
        //var allElements = form.elements;
        
        allElements = allElements.filter(el => (
            el.tagName !== 'BUTTON' 
        ));
    
        for (var i = 0, l = allElements.length; i < l; ++i) {
            allElements[i].disabled=!allElements[i].disabled;
        }

    }


    render(){
        if(this.props.task.id){
            return(
                <>
                <Form className="home-task" onInput={this.setInputValue} onSubmit={(e)=> this.editTask(e, this.props.task.id)}>
                    <Form.Row>
                        <Col xs={6}>
                            <Form.Control type="text" placeholder="Normal text" name="content" defaultValue={this.props.task.content} disabled={true}/>
                        </Col>
                        <Col xs={2}>
                            <DatePicker
                                selected = {this.state.formData.due_date} 
                                onChange={this.handleChange}
                                name="due_date"
                                className='datepicker'
                                locale="es"
                            />
                        </Col>
                        <Col xs={2}>
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
                        <Col xs={1} className="justify-center">
                            <Button type="button" className="mb-2" onClick={(e) => this.disable(e)}>
                                <PencilSquare/>
                            </Button>
                        </Col>
                        <Col xs={1} className="justify-center">
                            <Button type="button" className="mb-2 d-none" variant="danger" onClick={() => this.props.deleteTaskFn(this.props.task.id)}>
                                <Trash/>
                            </Button>
                            <Button type="submit" className="mb-2">
                                Editar
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
        
                </>
            )
        }
    }
}

export default connect(null, {updateTask})(Task);