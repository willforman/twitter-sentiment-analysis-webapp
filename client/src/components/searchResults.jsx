import React, { Component } from 'react';
import Chart from "./charts/searchChart";
import { Collapsible, CollapsibleItem, Icon, CardPanel} from "react-materialize";

class SearchResults extends Component {
    // this component only updates when there is a new analysis with a new
    // search term
    shouldComponentUpdate(nextProps, nextStates) {
        return this.props.analysis.searchTerm !== nextProps.analysis.searchTerm;
    }
    
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

        if (analysis.tweetTotal === 0) {
            return (
              <CardPanel className="hoverable blue">
                  <span className="white-text">
                      No tweets were found.
                  </span>
              </CardPanel>  
            );
        }

        const differencePosNeg = analysis.posTweetsCount - analysis.negTweetsCount;
        
        let cardClass = "hoverable ";
        let analysisResult = "";
        
        if (differencePosNeg > 0) {
            cardClass = cardClass.concat("green");
            analysisResult = "positive";
        }
        else if (differencePosNeg === 0) {
            cardClass = cardClass.concat("yellow darken-1");
            analysisResult = "neutral";
        }
        else {
            cardClass = cardClass.concat("red");
            analysisResult = "negative";
        }

        return (
            <div>
                <CardPanel className={cardClass}>
                    <span className="white-text">
                        Twitter feels <strong>{analysisResult}</strong> about tweets including <strong>"{analysis.searchTerm}"</strong>.
                    </span>
                </CardPanel>

                <Chart analysis={analysis} key={analysis.searchTerm} />

                <Collapsible>
                    <CollapsibleItem
                        header="Most Positive Tweet"
                        icon={<Icon>thumb_up</Icon>}
                    >"{analysis.mostPosTweet.text}"
                    <br/><br/>Sentiment score: {analysis.mostPosTweet.score}
                    </CollapsibleItem>
                    <CollapsibleItem
                        header="Most Negative Tweet"
                        icon={<Icon>thumb_down</Icon>}
                    >"{analysis.mostNegTweet.text}"
                    <br/><br/>Sentiment score: {analysis.mostNegTweet.score}
                    </CollapsibleItem>
                </Collapsible>
            </div>
        );
    }
}
 
export default SearchResults;