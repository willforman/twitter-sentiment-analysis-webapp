# Twitter Sentiment Analysis  
This web app performs sentiment analysis on Twitter.

## Search
User can search for a phrase, and see a chart of the sentiment of the last 100 tweets with this phrase.

## Overall Sentiment Chart
Every hour on the hour, the server queries for 1000 random tweets from the US. These are analyzed saved in a database, along with the top 8 trending terms at the time. A chart plots all the analyses from the last 7 days, to visualize trends in overall sentiment of Twitter in the US.

# Tech Stack
## Front End
* React
* react-router
* Materialize
* axios
* moment
* chart.js

## Back End
* Node.js
* express
* mongoose for MongoDB
* sentiment
* twitter