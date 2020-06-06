const path = require("path");
const express = require("express");
const database = require("./database");
const twitterAnalysis = require("./twitterAnalysis");

const app = express();
const PORT = process.env.PORT || 3001;

// starts database then starts loop for data to be sent
async function start() {
    // starts the database
    await database.start()
    // deal with any errors
    .catch( (err) => console.error(err) );

    // starts loop
    addAnalysisLoop();
}

start();

// called when client searchs a term
app.get("/search", async (req, res) => {
    const {searchTerm} = req.query;

    try {
        const analysis = await twitterAnalysis.analyzeSearch(searchTerm);
        res.json(analysis);
    } catch (error) {
        console.error(error);
    }
});

// called when client looks at chart
app.get("/data", async (req, res) => {
    try {
        const analysis = await database.getAnalyses();
        res.json(analysis);
    } catch (error) {
        console.error(error);
    }
});

// adds analysis to database
async function addAnalysis() {
    const date = new Date();

    try {
        const analysis = await twitterAnalysis.getCurrentSentiment();
        database.addAnalysis(analysis, date);
    } catch(error) {
        console.error(error);
    }
}

// resolves every hour on the hour
function everyHour() {
    function getNextCallTime() {
        const nextCallTime = new Date();

        nextCallTime.setMinutes(0);
        nextCallTime.setSeconds(0);

        nextCallTime.setHours(nextCallTime.getHours() + 1);

        return nextCallTime;
    }

    return new Promise( (resolve, reject) => {
        const milliseconds = getNextCallTime() - Date.now();
        setTimeout( () => { resolve()}, milliseconds);
    });
}

async function addAnalysisLoop() {
    // resolves every hour on hour
    await everyHour();
    // adds analysis
    try {
        await addAnalysis();
    } catch (error) {
        console.error(error);
    }
    //calls function again
    addAnalysisLoop();
}

// check for Heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../../build"));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));