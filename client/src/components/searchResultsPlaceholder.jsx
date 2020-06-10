import React, { Component } from 'react';
import SearchResults from "./searchResults"
import {CardPanel} from "react-materialize"

export default class SearchResultsWithPlaceHolder extends Component {
    render() { 
        const {analysis} = this.props;
        
        // only renders search results if theres an analysis
        // to show
        if (Object.keys(analysis).length === 0) { // check if object is empty
            return (
                <CardPanel className="hoverable blue">
                    <span className="white-text">
                        Search for a phrase to determine what Twitter thinks of it.
                    </span>
                </CardPanel>
            );
        }

        return(
            <SearchResults
                analysis={analysis}
            />
        );
    }
}
 
