#!/usr/bin/python
import quandl
import pandas as pd
import numpy as np
import requests
import SimpleHTTPServer
import SocketServer
import string

#The default port for httpserver is 8000. Setting the port to 7777
PORT = 7777
Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)

quandl.ApiConfig.api_key = "zC992yeEkw5VTye5PFJY"

#Extracting data from quandl using the api key provided
def extractCompanyData(ticker):
    api_url = string.Template("https://www.quandl.com/api/v3/datasets/EOD/$ticker.csv?api_key=$key").substitute(ticker=ticker, key=quandl.ApiConfig.api_key)
    session = requests.Session()
    raw_data = session.get(api_url)
    stock = raw_data.content.decode('utf-8')
    return stock

#Writing the data from quandl into a CSV file
def createCSV(filename, stock, no_of_days):
    with open(filename,'wb') as file:
        days = 0
        for line in stock:
            file.write(line)
            if line=='\n':
                days += 1
            if days == no_of_days:
                break

print "Creating CSV files.."
apple_stock = extractCompanyData('AAPL')
createCSV('aapl.csv', apple_stock, 20)

walmart_stock = extractCompanyData('WMT')
createCSV('wmt.csv', walmart_stock, 20)

visa_stock = extractCompanyData('V')
createCSV('v.csv', visa_stock, 20)

print "Serving at port", PORT
httpd.serve_forever()
