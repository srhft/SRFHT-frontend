import React from 'react'
import { useSelector } from 'react-redux';
import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer, CartesianGrid, Legend, Tooltip, Cell } from 'recharts';

function BarChartComponent() {
  const strategies = useSelector(s => s.strategies.strategies)

  const getBarColor = (value) => {
    return value < 0 ? "#ffa2a2" : "#beffa0";
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
        <BarChart
        data={strategies}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="algoname" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="netmtm"  >
          {strategies.map((strategy, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(strategy.netmtm)}  />
          ))}
        </Bar>
        </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent