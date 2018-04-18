The code can be run by going the the stockchart folder through command line and running 'python main.py'
'Control + C' can be used to stop the server on the command line.

After running python main.py, open a browser and paste the url: http://localhost:7777/

You will get a drop down to see the stock rates from 3 different companies. I have currently displayed the data for 3 months but the amount of days
you want to display can be changed. You can click on the options shown at the bottom of the x-axis of the chart to display a specific category (high,low,open,close, average)

In the first extra credit question I have calculated the moving average by dividing the total sum of the close prices by the total number of days for each point.

The charting library I chose to use was C3.js.
