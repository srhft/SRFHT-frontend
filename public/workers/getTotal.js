function calculateTotals(colDef) {
    let totals = {};
    colDef.forEach((e) => {
      if (["qty", "mtm", "amt"].some((s) => e.field.includes(s))) {
        totals = { ...totals, [e.field]: 0 };
      }
    });
  
    return totals;
  }

self.onmessage = (event) => {
    const start = performance.now()
    const { gridRows, colDefString } = event.data;

    const totals = calculateTotals(JSON.parse(colDefString))

    if(gridRows.length){
        gridRows.forEach((node) => {
            Object.keys(totals).forEach((e, i) => {
                if(isNaN(node[e])) return
                totals[e] += parseFloat(node[e]);
            })
        });
    } 
    const end = performance.now()
    console.log(`GetTotal took ${end - start} milliseconds`);
    self.postMessage({strategyid: "Total", ...totals});
}
