import React, { Component } from 'react';
import { Card, CardPanel, Collection, CollectionItem } from 'react-materialize';

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

        
        return ( 
            <Card
                className="blue hoverable"

            >
            <div className="white-text">
                <h5>
                    {analysis.created}
                </h5>
                <Collection header="Trending:" className="black-text">
                    <CollectionItem>1. {analysis.trends[0]}</CollectionItem>
                    <CollectionItem>2. {analysis.trends[1]}</CollectionItem>
                    <CollectionItem>3. {analysis.trends[2]}</CollectionItem>
                    <CollectionItem>4. {analysis.trends[3]}</CollectionItem>
                    <CollectionItem>5. {analysis.trends[4]}</CollectionItem>
                    <CollectionItem>6. {analysis.trends[5]}</CollectionItem>
                    <CollectionItem>7. {analysis.trends[6]}</CollectionItem>
                    <CollectionItem>8. {analysis.trends[7]}</CollectionItem>
                </Collection>
            </div>
            </Card>
        );
    }
}