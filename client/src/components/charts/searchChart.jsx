import React, { Component } from 'react';
import Chart from "chart.js";

class SearchChart extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const {analysis} = this.props;
        const chartRef = this.chartRef.current.getContext("2d");
        
        this.chart = new Chart(chartRef, {
            type: "pie",
            data: {
                labels: ["Positive Tweets",
                "Negative Tweets", "Neutral Tweets"],
                datasets: [{
                    data: [analysis.posTweetsCount, 
                    analysis.negTweetsCount, analysis.ntrlTweetsCount],
                    backgroundColor: [
                        "rgb(76, 175, 80)",
                        "rgb(244, 67, 54)",
                        "rgb(253, 216, 53)"
                    ],
                }]
            },
            options: {
                title: {
                    display: true,
                    text: `Last 100 tweets queried with ${this.props.searchTerm}`,
                }
            }
        });
    }


    render() {
        return (
            <canvas ref={this.chartRef} />
        );
    }
}
 
export default SearchChart;
