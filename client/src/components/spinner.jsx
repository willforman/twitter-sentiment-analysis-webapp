import React, { Component } from 'react';
import { Preloader } from 'react-materialize';

class LoadingSpinner extends Component {
    

    render() {
        const divStyle = {
            display: "flex",
            justifyContent: "center",
        };

        return (
            <div style={divStyle}>
                <Preloader/>
            </div>
        );
    }
}
 
export default LoadingSpinner;