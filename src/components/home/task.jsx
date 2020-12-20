import React from 'react';
import {
    Form, 
    Col, 
    Button,
    Container
} from 'react-bootstrap';
import { ArrowRight, Trash, PencilSquare } from 'react-bootstrap-icons';
import '../common/style.css';

export default function Task(props){
    return(
        <>
        <Form>
            <Form.Row className="home-task">
                <Col xs={8}>
                    <Form.Control type="text" placeholder="Normal text" value={props.task.content} />
                </Col>
                <Col xs={2}>
                    <Form.Control type="text" placeholder="Normal text" />
                </Col>
                <Col xs={1} className="justify-center">
                    <Button type="button" className="mb-2">
                        <PencilSquare/>
                    </Button>
                </Col>
                <Col xs={1} className="justify-center">
                    <Button type="button" className="mb-2" variant="danger" onClick={() => props.deleteTaskFn(props.task.id)}>
                        <Trash/>
                    </Button>
                </Col>
            </Form.Row>
        </Form>

        </>
    )
}