// Sine Wave from 0 to 20kHz
let wavePts = [];
for (let f = 0; f < 2000; f++) {
  wavePts.push({ 'x': f, 'y': Math.sin(f * Math.PI / 180)});
  //wavePts.push({ 'x': f, 'y': f * 3 });
}

const data = {
  datasets: [
    { 
      data: wavePts,
      parsing: false,
      pointRadius: 0,
      spanGaps: true,
      pointHitRadius: 10,
      pointHoverRadius: 10,
      pointHoverBorderColor: '#ffa500',
    },
  ]
};

const config = {
  type: 'line',
  data,
  options: {
    
    scales: {
      
      x: {
        type: 'logarithmic',
        min: 0,
        max: 2000,
        title: {
          display: true,
          text: 'Frequency (Hz)'
        }
      },
      y: {
        type: 'linear',
        min: -2,
        max: 2,
        title: {
          display: true,
          text: 'Gain (dB)'
        }
      }
    },
    plugins: {
     title: {
       display: true,
       text: '2D Line Chart - Sine Wave'
     },
     legend: {
       display: false
     },
     elements: {
       line: {
         borderColor: '#ffa500',
         borderWidth: 2,
         drawLine: false,
       }
     }
    }
  },
  plugins: [
  ]
};


window.electron.createChart('myChart', config);