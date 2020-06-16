const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    searchTerm: String,
    posTweetsCount: Number,
    negTweetsCount: Number,
    ntrlTweetsCount: Number,
    tweetTotal: Number,
    mostPosTweet: {
        score: Number,
        text: String,
    },
    mostNegTweet: {
        score: Number,
        text: String,
    }
});

const SearchAnalysis = mongoose.model("Search-Analysis", searchSchema);

const TwitterAnalysis = mongoose.model("Twitter-Analyses", new Schema({
    created: Date,
    posTweetCount: Number,
    negTweetCount: Number,
    totalTweetCount: Number,
    trendsAnalyses: [searchSchema],
}));

class AnalysisDatabase {
    // uri of atlas cluster
    uri = process.env.CLUSTER_TWITTER_URI;

    // connects to database
    async start() {
        mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
        .then( () => {
            console.log("database connected");
        }, (error) => {
            console.error(error);
        });
    }

    // gets analyses from the last 2 or 5 days depending on if mobile
    getAnalyses(isMobile) {
        const daysAgo = isMobile === "true" ? 2 : 5;
        const dateDaysAgo = getDateDaysAgo(daysAgo);

        // gets date of how many days ago were passed to function
        function getDateDaysAgo(daysAgo) {
            const date = new Date();
            date.setDate( date.getDate() - daysAgo );
            return date;
        }

        return new Promise( (resolve, reject) => {
            // queries for those with date greater than date of 2/5 days ago
            TwitterAnalysis.find( {created: { "$gte": dateDaysAgo }}, (err, entries) => {
                if (err) reject(err);
                resolve(entries);
            });
        });
    }

    // adds analyses to database
    addAnalysis(overallAnalysis, created) {
        return new Promise( (resolve, reject) => {
            const {trends} = overallAnalysis;

            // turns array of analyses to SearchAnalysis Schemas
            const analysesTrendingSchemas = trends.map( (analysis) => {
                const {searchTerm, posTweetsCount, negTweetsCount, ntrlTweetsCount, mostPosTweet, mostNegTweet, tweetTotal} = analysis;
                return new SearchAnalysis({
                    searchTerm,
                    posTweetsCount,
                    negTweetsCount,
                    ntrlTweetsCount,
                    mostPosTweet,
                    mostNegTweet,
                    tweetTotal
                });
            });
            
            const entry = new TwitterAnalysis({
                created,
                posTweetCount: overallAnalysis.posTweetCount,
                negTweetCount: overallAnalysis.negTweetCount,
                totalTweetCount: overallAnalysis.totalTweetCount,
                trendsAnalyses: analysesTrendingSchemas
            });

            entry.save( (err, entry) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}

module.exports = new AnalysisDatabase();