// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const Chart = require('chart.js');
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
  'electron',
    {
        createChart: (canvasId, params) => {
          let ctx = document.getElementById(canvasId);
          let chart = new Chart(ctx, params);
        }
    }
)
