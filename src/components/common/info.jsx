import React from "react";

class Informacion extends React.Component{
    constructor(){
        super();
        this.state = {
            info: []
        };
    }

    componentDidMount(){
        let url = 'http://localhost:8000/api/v1/info';
        let opciones = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        fetch(url, opciones)
        .then(response=>response.json())
        .then(data => {this.setState({info:[data.lista]});console.log(data.lista)})
    }

    render(){
        //var mostrarItems = this.state.info.map((item)=><div>{item}</div>);
        return(
            <>
                { this.state.info.map((task)=>(
                                    <div>{task}</div>
                                ))
                            }
            </>
        );
    }
}

export default Informacion;