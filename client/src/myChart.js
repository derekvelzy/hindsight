var MyChart = function() {
  this.ticker = "My Portfolio";
  this.name = "";
  this.data = null;
}

MyChart.prototype.setData = function() {
  var arr = [];
  if (arguments[0].length > 0) {
    for (let i = 0; i < arguments[0][0].data.length; i++) {
      arr.push({date: null, cost: 0});
    }

    for (let i = 0; i < arguments[0].length; i++) {
      var data = arguments[0][i].data;
      for (let j = 0; j < data.length; j++) {
        arr[j].date = data[j].date;
        arr[j].cost += Number.parseInt(data[j].cost) * arguments[0][i].shares;
      }
    }
  }
  this.data = arr;
}

MyChart.prototype.getValue = function() {
  return this.data[this.data.length - 1].cost;
}

export default MyChart;