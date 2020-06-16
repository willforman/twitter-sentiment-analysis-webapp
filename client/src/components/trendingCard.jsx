import React, { Component } from 'react';
import { Card, CardPanel, Table } from 'react-materialize';

export default class TrendingCard extends Component {
    render() {
        const analysis = this.props.pointClicked;

        if (Object.keys(analysis).length === 0){ 
            return (
                <CardPanel className="blue hoverable">
                    <span className="white-text">
                        Click a point on the graph to see what was trending at that time.
                    </span>
                </CardPanel>
            );
        }

        const {onItemClicked} = this.props;
        
        return ( 
            <Card
                className="blue hoverable"

            >
            <div className="white-text">
                <h5>
                    {analysis.created}
                </h5>
                <h6>Click on an item to see it's analysis.</h6>

                <Table className="white black-text">
                    <thead>
                        <tr>
                            <th data-field ="searchTerm">Search Term</th>
                            <th data-field ="percPos">Pos. Tweets %</th>
                        </tr>
                    </thead>
                    <tbody>   
                        {analysis.trendsAnalyses.map( (trend, index) => {
                            const percPos = (trend.posTweetsCount / (trend.negTweetsCount + trend.posTweetsCount) * 100).toFixed(0);
                            const textColor = percPos > 50 ? "green-text" : "red-text";
                            return <tr key={index} onClick={(event) => onItemClicked(index, event)}>
                                <td>{trend.searchTerm}</td>
                                <td className={textColor}>{percPos}%</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                

            </div>
            </Card>
        );
    }
}