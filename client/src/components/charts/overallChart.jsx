import React, { Component } from 'react';
import Chart from "chart.js";
import LoadingSpinner from "../spinner";
import axios from "axios";
import moment from "moment";

class AnalysisChart extends Component {
    chartRef = React.createRef();

    state = {
        loading: true,
    }

    // creates chart when component is rendered
    componentDidMount() {

        // first has to get data from server
        this.setData()
        // then sets graph
        .then( () => {
            // gets array of just data from analyses
            const data = this.state.data.map( (entry) => {
                const total = entry.posTweetCount + entry.negTweetCount;
                
                const percPos = (entry.posTweetCount / total * 100).toFixed(2);

                return percPos;
            });
    
            // gets array of just times from analyses
            const labels = this.state.data.map( (entry) => {
                return entry.created;
            });

            // chart is not loading anymore
            this.setState( {loading: false} );

            const chartRef = this.chartRef.current.getContext("2d");

            this.chart = new Chart(chartRef, {
                type: "line",
                data: {
                    labels,
                    datasets: [
                        {
                            data,
                            borderColor: "rgb(33, 150, 243)",
                            backgroundColor: "rgb(33, 150, 243, 0.25)",
                            pointHitRadius: 10,
                        }
                    ]
                },
                options: {
                    legend: {
                        display: false,
                    },
                    scales: {
                        xAxes: [{
                            // type: "time",
                            scaleLabel: {
                                display: true,
                            },
                            ticks: {
                                maxTicksLimit: 10,
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Pos. Tweets Percent"
                            },
                            ticks: {
                                precision: 0,
                                callback: (value, index, values) => {
                                    return value + "%";
                                }
                            }
                        }]
                    },
                    "onClick" : (event, item) => {
                        // if not clicking a point, ends function
                        if (item.length === 0) return;
                        
                        // gets point that was clicked on
                        const pointIndex = item[0]._index;
                        const pointObj = this.state.data[pointIndex];
                        this.props.onPointClick(pointObj);
                    },
                } 
            });
        });
    }

    setData = () => {
        return new Promise((resolve, reject) => {
            axios.get("/data")
            .then( (response) => {
                const {data} = response;

                data.forEach( (entry) => {
                    const {created} = entry;
                    const formattedCreated = moment(created)
                    //.format("MMMM Do YYYY, h:mm a");
                    .format("MMMM Do[,] h a")
                    entry.created = formattedCreated;
                });


                this.setState( {data} );
                resolve();
            })
            .catch( (err) => reject(err));
        });
    }

    handleClick = () => {
        this.addData();
        this.setData();
    }

    render() {
        // returns loading spinner while loading
        if (this.state.loading) {
            return <LoadingSpinner/>
        }
        // returns chart if done loading
        return <canvas ref={this.chartRef} />
    }
}
 
export default AnalysisChart;
