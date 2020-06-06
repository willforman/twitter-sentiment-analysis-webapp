import React, { Component } from 'react';
import Chart from "chart.js";

class SearchChart extends Component {
    chartRef = React.createRef();
    
    componentDidMount() {
        const {analysis} = this.props;
        const chartRef = this.chartRef.current.getContext("2d");

        let chartString = "";
        if (analysis.tweetTotal === 100) {
            chartString = `Last 100 tweets`
        }
        else {
            if (analysis.tweetTotal === 1) {
                chartString = `1 tweet in the last 7 days`
            }
            else {
                chartString = `${analysis.tweetTotal} tweets in the last 7 days`
            }
        }

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
                    text: `${chartString} queried with ${analysis.searchTerm}`,
                },
                legend: {
                    display: false
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
