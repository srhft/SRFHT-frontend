import excludeColumns from "../assets/json/excudeColumn";

const INRFormater = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
})

export const currencyFormater = (p) => {
    if(p.column.colId.match("id$") && !p.column.colId.includes(["bid"])) return
    if(isNaN(p.value)) return 
    return 
}


export const saveColDef = (id,e) => {
    const columns = e.columnApi.getColumnState();
    localStorage.setItem(`${id}ColDef`, JSON.stringify(columns))
}

export const setColorBasedOnPoNag = (params) => {
    if (params.value < 0) {
      return { color: "red", "textAlign": "right" };
    } else if (params.value > 0) {
      return { color: "green", "textAlign": "right" };
    } else {
      return null;  
    }
}

export const IntParser  = (p) => {
    if(p.column.colId.includes("id") && !p.column.colId.includes(["bid"])) return
    if(!isNaN(p.value) ){
        return INRFormater.format(p.value)
    }
}

export const RedGreenCellBasedOnOldValue = (p) => {
    const oldValue = p.data?.oldValue;
    if(oldValue && p.data[p.column.colId] > oldValue[p.column.colId]) {
        return {color: 'green', "textAlign": "right"};
    } else return {color: 'red', "textAlign": "right"}; 
}


