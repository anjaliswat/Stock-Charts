//Gets the element id of the company name the user has clicked on from the dropdown box. Sends the csv file of the selected company to parseData
function SelectCompany() {
  var elem = document.getElementById('company');
  company_name = elem.value;
  console.log(company_name)
  if(company_name=='Apple')
    parseData('aapl.csv')
  else if(company_name=='Visa')
    parseData('v.csv')
  else if(company_name=='Walmart') {
    parseData('wmt.csv')
  }
}

//parseData will parse the data using Papa.parse which will extract the data from the csv file and store it in an array form. This array will then be passed into createGraph()
function parseData(file) {
  Papa.parse(file, {
    download: true,
    complete: function(results) {
      createGraph(results.data);
    }
  });
}

//createGraph sets the x axis based on dates and the y-axis based on Open,High,Low,Close and Moving average
function createGraph(data) {
  var dates = [];
  var xvalues = [];
  sum = 0;
  avg = 0;
  var open = ["Open"];
  var high = ["High"];
  var low = ["Low"];
  var close = ["Close"];
  var average = ["Moving Average"];

  for (var i = 1;i < data.length-1; i++) {

    sum += parseFloat(data[i][4]);
    avg = sum/i;
    dates.push(data[i][0]);
    if (data[i][0].split("-")[2]=="01")
      xvalues.push(data[i][0].split("-")[1])
    else
      xvalues.push("")
    open.push(data[i][1]);
    high.push(data[i][2]);
    low.push(data[i][3]);
    close.push(data[i][4]);
    average.push(avg)

   }

  var chart = c3.generate({
    bindto: '#chart',
    data: {
        columns: [
          open,high,low,close,average
        ]
    },
    axis: {
        x: {
            type: 'category',
            categories: dates
        }
    }
  });
}
