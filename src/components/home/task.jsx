import React from 'react';
import {
    Form, 
    Col, 
    Button,
    Container
} from 'react-bootstrap';
import { ArrowRight, Trash, PencilSquare } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import {toast} from 'react-toastify';
import '../common/style.css';



toast.configure();
export default class Task extends React.Component{

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
        // const datepickers=document.querySelectorAll('input[name="due_date"]');
        const datepickers=document.getElementsByClassName('datepicker');
        for (var i=0; i<datepickers.length; i++){
            datepickers[i].setAttribute('disabled', 'true');
            // console.log(datepickers[i]);
        }
        console.log(this.props.task.status);
    }

    editTask = (evento, id) =>{
        evento.preventDefault();
        this.disable(evento);

        let url = "http://localhost:8000/api/v1/tasks/"+id;
        let opciones = {
            method: "PUT",
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
                toast.success('Tarea editada con exito');
                this.props.tasksFn();
                this.componentDidMount();
            }
        })
        .catch(error => {
            console.log(error);
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
                                    <option value={status.id}>{status.name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                        <Col xs={1} className="justify-center">
                            <Button type="button" className="mb-2" onClick={(e) => this.disable(e)}>
                                <PencilSquare/>
                            </Button>
                        </Col>
                        <Col xs={1} className="justify-center">
                            <Button type="button" className="mb-2" variant="danger" onClick={() => this.props.deleteTaskFn(this.props.task.id)}>
                                <Trash/>
                            </Button>
                            <Button type="submit" className="mb-2 d-none">
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