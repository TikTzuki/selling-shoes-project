import React, { useContext } from 'react'
import {LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const data = [
  {name: 'Page A', uv: 787, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 536, pv: 2400, amt: 2400},
  {name: 'Page C', uv: 567, pv: 2400, amt: 2400},
  {name: 'Page D', uv: 594, pv: 2400, amt: 2400},
];

const LineChartCustom = (props) => {
  console.log("props", props);
  return (
    <LineChart width={500} height={200} data={data}>
      <Line typ="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#000" strokeDasharray="5 5" />
      <XAxis dataKey="name"/>
      <YAxis />
    </LineChart>
  )
}

export default LineChartCustom
