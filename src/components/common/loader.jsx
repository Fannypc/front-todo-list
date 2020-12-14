import React from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import './style.css';


export default class Loader extends React.Component{

    render(){
        return (
            <div className="loader-container">
             <PropagateLoader
                color={"#36D7B7"}
            />
            </div>
        );
    }

    

}