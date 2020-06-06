const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const twitterAnalysis = mongoose.model("twitter-analysis", new Schema({
    created: Date,
    posTweetCount: Number,
    negTweetCount: Number,
    totalTweetCount: Number,
    trends: [String],
}));

class AnalysisDatabase {
    // url of atlas cluster
    url = process.env.CLUSTER_TWITTER_URI;

    // connects to database
    async start() {
        console.log(this.url);
        mongoose.connect(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
        .then( () => {
            console.log("database connected");
        }, (error) => {
            console.error(error);
        });
    }

    // gets analyses from the last week
    getAnalyses() {
        // this function gets date of a week ago
        function getWeekAgo() {
            const date = new Date();
            date.setDate( date.getDay() - 7 );
            return date;
        }

        return new Promise( (resolve, reject) => {
            const weekAgo = getWeekAgo();

            // queries for those with date greater than date of a week ago
            twitterAnalysis.find( {created: { "$gte": weekAgo }}, (err, entries) => {
                if (err) reject(err);
                resolve(entries);
            });
        });
    }

    // adds analyses to database
    addAnalysis(analysis, created) {
        return new Promise( (resolve, reject) => {
            const entry = new twitterAnalysis({
                created,
                posTweetCount: analysis.posTweetCount,
                negTweetCount: analysis.negTweetCount,
                totalTweetCount: analysis.totalTweetCount,
                trends: analysis.trends,
            });

            entry.save( (err, entry) => {
                if (err) reject(error);
                resolve();
            });
        });
    }
}

module.exports = new AnalysisDatabase();