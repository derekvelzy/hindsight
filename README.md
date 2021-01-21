# Hindsight #
[Link to Demo Video on Youtube](https://www.youtube.com/watch?v=strBvuNb_ls)

## Overview ##
This app was created to introduce people into the world of stock trading in a way where they wouldn't lose real money. I found it difficult to start trading stocks and I know there are plenty of other people out there who feel the same way.

## Screenshots ##
![Hindsight Home](https://frisbee-images.s3-us-west-1.amazonaws.com/Hindsight_Home.png)
![Hindsight Buy/Sell](https://frisbee-images.s3-us-west-1.amazonaws.com/Hindsight_buysell.png)
![Hindsight Search](https://frisbee-images.s3-us-west-1.amazonaws.com/Hinsight_search.png)
![Hindsight News](https://frisbee-images.s3-us-west-1.amazonaws.com/Hinsight_news.png)

## Features ##
- The user will be able to view an interactive chart that shows their historical portfolio performance, as well as any publicly traded company they select.
- App contains "Portfolio Diversity" section displaying a pie chart and equity/percentages of the shares they own.
- The user can search for stocks with the search bar, and add stocks to their Watchlist.
- The users owned stocks and stocks in the Watchlist are displayed as cards, which show the latest price, precentage change from yesterday, and the amount of shares owned.
- Clicking on the "Trade" button on each card will allow the user to buy or sell shares.
- Clicking on the highlighted part of the card showing the stocks' name will bring the user to a stock focus page.
  - This new page will show the latest news on that selected company.
  - Google Cloud Natural Language API (Currently inoperational) provides the user incentive to buy or sell the stock based on news articles and a Twitter search of the company. This is done with Google Cloud's sentiment analysis.

## Tech/framework Used ##
__Built with__
- React
- Node.js
- MongoDB
- Webpack
- CSS Modules

__Other technologies used__
- Twitter API
- Polygon.io API
- AlphaVantage stock data API

## Run the Project Locally ##
From the repo
1. Clone the project locally
2. Run ```npm start``` in the command line
4. Open [http://localhost:8020](http://localhost:8020) with your browser to see the result

