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

let scriptableFuncs = [ ]
let electronCtxBridgeFuncs = {
    createChart: (canvasId, params, ...scriptables) => {
      for (let i = 0; i < scriptables.length; i+=3) {
        let funcIdx = scriptables[i+2];
        console.log(`Register Scriptable ${scriptables[i+1]} to func index ${funcIdx}`);
        scriptables[i][scriptables[i+1]] = scriptableFuncs[funcIdx];
      }
      let ctx = document.getElementById(canvasId);
      let chart = new Chart(ctx, params);
    },

    // Seems like all the arguments through the context bridge functions
    // are 'structurally-cloned'. Therefore, functions has to be 
    // implemented here and cannot be passed in through the bridge call.
    onCtrlPtRadius: (context) => {
      //console.log(`Dataset Index: ${context.datasetIndex}`);
      //console.log(`Data Index: ${context.dataIndex}`);
      console.log(`onCtrlPtRadius: ${context.dataIndex}`);
      let val = context.dataset.data[context.dataIndex].y;
      console.log(`onCtrlPtRadius: val = ${val}`);
      if (val === -1 || val === 1) {
        return 5;
      }
      return 0;
    }
};
scriptableFuncs.push(electronCtxBridgeFuncs.onCtrlPtRadius);

contextBridge.exposeInMainWorld('electron', electronCtxBridgeFuncs);

