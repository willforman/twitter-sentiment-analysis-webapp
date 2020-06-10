import React, { Component } from 'react';
import Chart from "./components/charts/overallChart";
import TrendingCard from "./components/trendingCard";
import SearchResults from "./components/searchResults"

class ChartScreen extends Component {
    state = {
        pointClicked: {},
        analysis: {},
    };

    handlePointClicked = (pointClicked) => {
        this.setState({ pointClicked });
    }

    handleItemClicked = (indexClicked, event) => {
        const analysis = this.state.pointClicked.trendsAnalyses[indexClicked];
        if (analysis) {
            this.setState({ analysis});
        }
    }
    
    render() { 
        return ( 
            <div className="row">
                <h3 className="center-align">Overall Sentiment</h3>
                <Chart
                    onPointClick={this.handlePointClicked}
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