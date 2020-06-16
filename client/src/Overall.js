import React, { Component } from 'react';
import Chart from "./components/charts/overallChart";
import TrendingCard from "./components/trendingCard";
import SearchResults from "./components/searchResults";
import {isMobile} from "react-device-detect";

class ChartScreen extends Component {
    state = {
        pointClicked: {},
        analysis: {},
    };

    // shows analysis for point when it's clicked on graph
    handlePointClicked = (pointClicked) => {
        this.setState({ pointClicked, analysis: {} });
    }

    // item from trending list is clicked
    handleItemClicked = (indexClicked, event) => {
        const analysis = this.state.pointClicked.trendsAnalyses[indexClicked];
        this.setState({ analysis });
    }
    
    render() {
        const daysShown = isMobile ? 2 : 5;

        return ( 
            <div className="row">
                <h4 className="center-align">Overall US Sentiment Over Last {daysShown} Days</h4>
                <Chart
                    onPointClick={this.handlePointClicked}
                    isMobile={isMobile}
                />
                <TrendingCard
                    pointClicked={this.state.pointClicked}
                    onItemClicked={this.handleItemClicked}
                />
                <SearchResults
                    analysis={this.state.analysis}
                />
            </div>
        );
    }
}
 
export default ChartScreen;