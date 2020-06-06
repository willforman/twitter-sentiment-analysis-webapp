import React, { Component } from 'react';

class SearchBar extends Component {
    
    render() { 
        // used to change color of underline for text field
        const textFieldStyle = {
            borderBottom: "1px solid rgb(33, 150, 243)",
            boxShadow: "0 1px 0 0 rgb(33, 150, 243)",
        };

        return (
            <div className="row">
                <h3 className="center-align">Search</h3>

                <div className="row">
                    <form>
                        <div className="input-field col s9">
                            <input
                                id="search"
                                type="text"
                                autoComplete="off"
                                onChange={event => this.props.onChange(event)}
                                style={textFieldStyle}
                            />
                            <label htmlFor="search" style={{color: "rgb(33, 150, 243)"}}>Enter phrase...</label>
                        </div>
                        <div className="input-field col s3">
                            <button 
                                type="submit"
                                className="btn waves-effect waves-light blue"
                                onClick={ (event) => this.props.onSearch(event)}
                            >Analyze
                            <i className="material-icons right">search</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
        );
    }
}
 
export default SearchBar;