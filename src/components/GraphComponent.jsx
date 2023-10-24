import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import {
  Label,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

let initialData = [
  { name: 1650139200000, cost: 3.78 },
  { name: 1650225600000, cost: 2.14 },
  { name: 1650312000000, cost: 4.25 },
  { name: 1650398400000, cost: 1.92 },
  { name: 1650484800000, cost: 2.89 },
  { name: 1650571200000, cost: 6.1 },
  { name: 1650657600000, cost: 3.25 },
  { name: 1650744000000, cost: 1.56 },
  { name: 1650830400000, cost: 2.78 },
  { name: 1650916800000, cost: 4.92 },
  { name: 1651003200000, cost: 3.47 },
  { name: 1651089600000, cost: 2.31 },
  { name: 1651176000000, cost: 5.02 },
  { name: 1651262400000, cost: 1.98 },
  { name: 1651348800000, cost: 4.11 },
  { name: 1651435200000, cost: 3.09 },
  { name: 1651521600000, cost: 1.27 },
  { name: 1651608000000, cost: 2.54 },
  { name: 1651694400000, cost: 5.83 },
  { name: 1651780800000, cost: 3.64 },
  { name: 1651867200000, cost: 1.75 },
  { name: 1651953600000, cost: 3.91 },
  { name: 1652040000000, cost: 2.01 },
  { name: 1652126400000, cost: 4.56 },
  { name: 1652212800000, cost: 5.09 },
  { name: 1652299200000, cost: 2.87 },
  { name: 1652385600000, cost: 1.31 },
  { name: 1652472000000, cost: 3.09 },
  { name: 1652558400000, cost: 4.25 },
  { name: 1652644800000, cost: 2.16 },
  { name: 1652731200000, cost: 1.95 },
  { name: 1652817600000, cost: 5.73 },
  { name: 1652904000000, cost: 3.85 },
  { name: 1652990400000, cost: 1.65 },
  { name: 1653076800000, cost: 3.02 },
  { name: 1653163200000, cost: 4.48 },
  { name: 1653249600000, cost: 2.77 },
  { name: 1653336000000, cost: 1.41 },
  { name: 1653422400000, cost: 3.21 },
  { name: 1653508800000, cost: 5.39 },
  { name: 1653595200000, cost: 3.15 },
];



const initialState = {
  data: initialData,
  left: "dataMin",
  right: "dataMax",
  refAreaLeft: "",
  refAreaRight: "",
  top: "dataMax+1",
  bottom: "dataMin-1",
  top2: "dataMax+20",
  bottom2: "dataMin-20",
  animation: true,
};

function GraphComponent({setMInMax}) {
  const [graphData, setGraphData] = useState(initialState);
  const [zoomIsOn, setzoomIsOn] = useState(false)

  const getAxisYDomain = (from, to, ref, offset) => {
    let refData = graphData.data;
    if(from && to){
      refData = refData.filter((d) => {
        return d.name >= from && d.name <= to;
      });
    } 

    const values = refData.map(d => d[ref]);
    const bottom = Math.floor(Math.min(...values)) - offset;
    const top = Math.ceil(Math.max(...values)) + offset;
  
    return [bottom, top];
  };

  const zoom = () => {
    let { refAreaLeft, refAreaRight, data } = graphData;
    if (refAreaLeft === refAreaRight || !refAreaRight) {
      setGraphData((p) => ({ ...p, refAreaLeft: "", refAreaRight: "" }));
      return;
    }

    //if if user starts from left to right then left will be greater then right and
    // it will be (10 > 5) which will return empty array
    if (refAreaLeft > refAreaRight) {
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]
    }

    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "cost", 1);

    setGraphData((p) => ({
      ...p,
      refAreaLeft: "",
      refAreaRight: "",
      data: data.slice(),
      left: graphData.refAreaLeft,
      right: graphData.refAreaRight,
      bottom,
      top,
    }));
  };

  //set min max and current for parent component
  const HandleCetMinMaxAndCurrent = (newDataCost) => {
    const [min, max] = getAxisYDomain(null, null, "cost", 0)
    setMInMax && setMInMax({min,max, current: newDataCost})
  }


  //adding dummy data
  const generateNewData = () => {
    const lastDate = graphData.data.at(-1).name;
    const date = lastDate + 86400000; // one day in milliseconds
    const cost = Math.floor(Math.random() * 1000) + 1; 
    let newData =  [...graphData.data, { name: date, cost: cost }];
    if (newData.length > 25) {
      newData = newData.slice(1);
    }
    HandleCetMinMaxAndCurrent(cost)
    return newData;
  };

  useEffect(() => {
    if (!zoomIsOn) {
      const timeoutId = setTimeout(() => {
        setGraphData(p => ({...p, data: generateNewData()}));
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [zoomIsOn, graphData.data]);




  const tickFormatter = (tick) => moment(tick).format('MM/DD/YYYY');
  return (
    <div style={{ userSelect: "none" }}>
      <div style={{display: "flex", justifyContent: "center"}}>
        <button
          disabled={!zoomIsOn}
          type="button"
          className="btn update"
          onClick={() => {setzoomIsOn(false); setGraphData(p => ({...initialData, data: p.data }))}}
        >
          Zoom Out
        </button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={graphData.data}
          onMouseDown={(e) => {setzoomIsOn(true); setGraphData((p) => ({ ...p, refAreaLeft: e?.activeLabel }))}}
          onMouseMove={(e) =>
            graphData.refAreaLeft &&
            setGraphData((p) => ({ ...p, refAreaRight: e?.activeLabel }))
          }
          onMouseUp={zoom}
        >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="40%" stopColor="#5278f7" stopOpacity={0.1}/>
            <stop offset="60%" stopColor="#c9d5fc" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
            domain={[graphData.left, graphData.right]}
            type="number"
            tickFormatter={tickFormatter}
            
          />
          <YAxis
            allowDataOverflow
            domain={[graphData.bottom, graphData.top]}
            type="number"
            yAxisId="1"
          />
          <Tooltip />
          <Area
            isAnimationActive={false}
            yAxisId="1"
            type="natural"
            dataKey="cost"
            stroke="#8884d8"
            fill="url(#colorUv)"
            animationDuration={300}
          />
          {graphData.refAreaLeft && graphData.refAreaRight ? (
            <ReferenceArea
              autoReverse={false}
              yAxisId="1"
              x1={graphData.refAreaLeft}
              x2={graphData.refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphComponent;
