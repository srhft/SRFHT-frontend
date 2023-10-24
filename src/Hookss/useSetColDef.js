import { useEffect, useState } from 'react'
import excludeColumns from '../assets/json/excudeColumn';

function useSetColDef(colDefs) {
    let worker = null
    const [isColDefSet, setIsColDefSet] = useState(false)
    const [colDef, setColdef] = useState(null)

    const setColumnDef = (api, data) => {
        if(!worker) worker = new Worker("/workers/getColDefWorker.js")
        if(isColDefSet) return
        if(!data || typeof data !== 'object') return 
        const gridname = api.current.props.id
        const colD = JSON.stringify(colDefs)
        console.log({apiii: api.current})
        console.log({data, gridname,  def: colDefs})
        worker.postMessage({data, excludeColumns, gridname,  colD})

        worker.onmessage = (e) => {
            const {grid, data} = e.data
            if(grid === gridname){
                const newCol =  [ ...colDefs, ...data]
                api.current.api?.setColumnDefs(newCol);
                setColdef(newCol)
                setIsColDefSet(true)
            }
            worker.terminate()
        }


        // Object.keys(data || []).map(e => {
        //     if(excludeColumns[gridname]?.some(i => i.includes(e))) return //excluding columns
        //     if (colDefs.map(def => def.field).includes(e)) return   // check if column with same field already exists
        //     colDefs.push({field : e})
        // })
        // api.current.api?.setColumnDefs(colDefs);
        // setColdef(colDefs)
        // setIsColDefSet(true)

    }

    return [setColumnDef, colDef]
}
 
export default useSetColDef