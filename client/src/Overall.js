import React, { Component } from 'react';
import Chart from "./components/charts/overallChart";
import TrendingCard from "./components/trendingCard"

class ChartScreen extends Component {
    state = {
        pointClicked: {},
    };

    handlePointClicked = (pointClicked) => {
        this.setState({ pointClicked });
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
                />
            </div>
        );
    }
}
 
export default ChartScreen;