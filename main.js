function cal(event){
  if(event){
      event.preventDefault();
  }
  
  let launchingUsers = document.querySelector("[name='launchingUsers']").value;
  let growth = (document.querySelector("[name='growth']").value/100)+1;
  let churn = (document.querySelector("[name='churn']").value/100);

  let pricePerYear = document.querySelector("[name='pricePerYear']").value;
  let variableCost = document.querySelector("[name='variableCost']").value;
  let fixedCost = document.querySelector("[name='fixedCost']").value;
  let startingCost = document.querySelector("[name='startingCost']").value;

  let data = [launchingUsers];
  let labels = [];
  let yearlyProfit = [-startingCost];

  for (let i=0; i<=5; i++){
      var yearlyUsers = (data[i]*growth)-(data[i]*churn).toFixed(2);
      data.push(yearlyUsers);
      labels.push(i);
  }
  for(let i=0, j=1; i<=4, j<=5; i++, j++){
      var profitPerYear = Math.floor((data[j]*pricePerYear)-fixedCost-(data[j]*variableCost)+yearlyProfit[i]);
      yearlyProfit.push(profitPerYear);
  }
  console.log(data);
  data.pop(data[6]);
  console.log(data);
  console.log(yearlyProfit);

  let result = document.querySelector("[class='result']");
  result.innerHTML = Math.trunc(data[5]);
  let profit = document.querySelector("[class='profit']");
  profit.innerHTML = Math.trunc(yearlyProfit[5]);
  createChart(labels,data,yearlyProfit);
}

let myChart = null;

function createChart(labelData,dataPoints,profitPoints){

  let labels = labelData;
  const data = {
      labels : labels,
      datasets : [
          {
              label : "Users",
              data : dataPoints,
              borderColor : "rgb(75,192,192)",
              yAxisID: 'y'
          },
          {
              label : "Profit",
              data : profitPoints,
              borderColor : "rgb(0,255,0)",
              yAxisID: 'profit'
          }
      ],
  };


  const config = {
      type: "line",
      data: data,
      options: {
        scales: {
          x: {
            beginAtZero: false,
            title: {
              color: "grey",
              display: true,
              text: "Years"
            },
            grid: {
              drawTicks: false
            }
          },
          y: {
            beginAtZero: true,
            type: 'linear',
            position: 'left',
            title: {
              color: "grey",
              display: true,
              text: "Yearly Users"
            },
            grid: {
              drawTicks: false
            }
          },
          profit: {
              beginAtZero: true,
            type: 'linear',
            position: 'right',
            title: {
              color: "grey",
              display: true,
              text: "Profit"
            },
            grid: {
              drawOnChartArea: false,
              drawTicks: false
            },
            // ticks: {
            //   callback: function(value, index, values){
            //       return `${value} k`;
            //   }
            // }
          }
        }
      }
  };

  const ctx = document.getElementById("myChart").getContext('2d');

  if(myChart!=null){
      myChart.destroy();
  }
  myChart = new Chart(ctx,config);
}
cal();