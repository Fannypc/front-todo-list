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
import './style.css';

export default function Home(props){
    const numbers = [1, 2, 3, 4, 5];

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
                    <Form>
                        <Form.Row>
                            <Col xs={9}>
                                <Form.Control placeholder="City" />
                            </Col>
                            <Col>
                                <Form.Control placeholder="State" />
                            </Col>
                            <Col>
                                <Button type="submit" className="mb-2">
                                    Submit
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                        <div className="">
                            { numbers.map(number => (
                                    <Task/>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}