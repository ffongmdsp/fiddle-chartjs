// Empty
// Sine Wave from 0 to 20kHz
let sineWavePts = [];
let sinePtRadius = [];
for (let f = 0; f < 2000; f++) {
  let y = Math.sin(f * Math.PI / 180);
  sineWavePts.push({ 'x': f, 'y': y });
  if (y === -1 || y === 1) {
    sinePtRadius.push(5);
  }
  else {
    sinePtRadius.push(0);
  }
}

const sinePtRadiusCb = (context) => {
  console.log(`Dataset Index: ${context.datasetIndex}`);
  console.log(`Data Index: ${context.dataIndex}`);
  return 0;
  let val = context.dataset[context.datasetIndex].data[dataIndex]
  if (val === 1 || val === -1) {
    return 5;
  }
  else {
    return 0;
  }
};

const data = {
  datasets: [
    { 
      label: 'Sine',
      data: sineWavePts,
      parsing: false,
      pointRadius: sinePtRadius,
      borderColor: '#20639b',
      spanGaps: true,
      pointHitRadius: 10,
      pointHoverRadius: 10,
      pointHoverBorderColor: '#ffa500',
    }
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
       text: 'Multi Line Chart - Sine & Cos Waves'
     },
     legend: {
       display: true
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