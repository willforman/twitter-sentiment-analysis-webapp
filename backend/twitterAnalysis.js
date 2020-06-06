const Sentiment = require("sentiment");
const Twitter = require("twitter");

const sentiment = new Sentiment();
const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// count of tweets to search for 
const searchCount = 100;

class TwitterSentAnalysis {
    analyzeSearch(searchTerm) {
        // creates string with search term surrounded in quotes for exact search
        // and with -RT at end to exclude RTs
        const exactSearchExcludeRT = "\"".concat(searchTerm).concat("\" -RT");

        // info to return to the server
        const analysis = {
            searchTerm,
            searchCount,
            posTweetsCount: 0,
            negTweetsCount: 0,
            ntrlTweetsCount: 0,
            // stores info about most positive and negative tweet
            mostPosTweet: {
                score: 0,
                text: ""
            },
            mostNegTweet: {
                score: 0,
                text: ""
            }
        };

        // parameters for twitter api query
        const searchQuery = {
            q: exactSearchExcludeRT,
            lang: "en",
            count: searchCount,
            tweet_mode: "extended",
        };

        return new Promise( (resolve, reject) => {
            twitterClient.get("search/tweets", searchQuery, (error, tweets, response) => {
                if (error) {
                    reject(error);
                }
                else {
                    tweets.statuses.forEach( (status) => {
                        const tweetText = status.full_text;
                        const analysisScore = sentiment.analyze(tweetText).score;

                        // if sentiment is positive
                        if (analysisScore > 0) {
                            analysis.posTweetsCount++;
                            if (analysisScore > analysis.mostPosTweet.score) {
                                analysis.mostPosTweet.score = analysisScore;
                                analysis.mostPosTweet.text = tweetText;
                            }
                        }

                        // if sentiment is negative
                        else if (analysisScore < 0) {
                            analysis.negTweetsCount++;
                            if (analysisScore < analysis.mostNegTweet.score) {
                                analysis.mostNegTweet.score = analysisScore;
                                analysis.mostNegTweet.text = tweetText;
                            }
                        }

                        else {
                            analysis.ntrlTweetsCount++;
                        }
                    });
                    resolve(analysis);
                }
            });
        });
    }

    // gets the current sentiment of tweets coming from the US
    getCurrentSentiment() {
        const tweetCount = 1000;
        const searchQuery = {
            // rough longitude latitude range of mainland US
            locations: "-161.75583,-68.01197,25.50139,48.85694",
        };
    
        return new Promise( (resolve, reject) => {
            const tweets ={
                posTweetCount: 0,
                negTweetCount: 0,
                totalTweetCount: 0,
            };
            
            twitterClient.stream("statuses/filter", searchQuery, (stream) => {
                stream.on("data", (tweet) => {
                    const sentAnalysisScore = sentiment.analyze(tweet.text).score;
                    
                    if (sentAnalysisScore > 0) {
                        tweets.posTweetCount++;
                    }
                    else if (sentAnalysisScore < 0) {
                        tweets.negTweetCount++;
                    }
                    tweets.totalTweetCount++;
                    
                    if (tweets.totalTweetCount >= tweetCount) {
                        stream.destroy();
                        
                        // gets top 8 trending terms at this time
                        twitterClient.get("trends/place", { id: 2379574}, (error, trends) => {
                            if (error) reject(error);

                            // converts response from API to array of just strings
                            let result = trends[0].trends.map( (trend) => trend.name);
                            // only keeps the first 10 of these
                            result = result.filter( (trend, index) => {
                                return index < 8;
                            });

                            // adds to returning object and returns it
                            tweets.trends = result;
                            resolve(tweets);
                        });
                    }
                })
                stream.on("error", (error) => reject(error));
            });
        });
    }
}

module.exports = new TwitterSentAnalysis();