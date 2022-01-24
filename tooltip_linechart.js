// https://github.com/chartjs/Chart.js/issues/2966
// https://github.com/chartjs/Chart.js/issues/9629
// Avoid 0 x-value because log(0) fails - the
// x-axis logarithmic scale then starts at 100.
// Sine Wave from 0 to 20kHz
let sineWavePts = [];
//let f = 0.1;
//sineWavePts.push({ 'x': f, 'y': Math.sin(f * Math.PI / 180)});
for (let f = 1; f < 2000; f++) {
  sineWavePts.push({ 'x': f, 'y': Math.sin(f * Math.PI / 180)});
  //wavePts.push({ 'x': f, 'y': f * 3 });
}
let cosineWavePts = [];
//f = 0.1;
//cosineWavePts.push({ 'x': f, 'y': Math.cos(f * Math.PI / 180)});
for (let f = 1; f < 2000; f++) {
  cosineWavePts.push({ 'x': f, 'y': Math.cos(f * Math.PI / 180)});
}

const data = {
  datasets: [
    { 
      label: 'Sine',
      data: sineWavePts,
      parsing: false,
      pointRadius: 0,
      borderColor: '#6b705c',
      spanGaps: true,
      pointHitRadius: 10,
      pointHoverRadius: 10,
      pointHoverBorderColor: '#ffa500',
    },
    { 
      label: 'Cosine',
      data: cosineWavePts,
      parsing: false,
      pointRadius: 0,
      borderColor: '#cb997e',
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
        },
        beginAtZero: true
      },
      y: {
        type: 'linear',
        min: -2,
        max: 2,
        title: {
          display: true,
          text: 'Gain (dB)'
        },
        beginAtZero: true
      }
    },
    interaction: {
      mode: 'nearest',
      intersect: 'true',
      axis: 'x'
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


window.electron.createChart('myChart', config);// Empty