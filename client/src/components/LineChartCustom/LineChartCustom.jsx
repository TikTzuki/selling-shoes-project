import { makeStyles, withStyles } from '@material-ui/styles';
import React, { useContext } from 'react'
import {LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const data = [
  {name: 'Page A', uv: 787, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 536, pv: 2400, amt: 2400},
  {name: 'Page C', uv: 567, pv: 2400, amt: 2400},
  {name: 'Page D', uv: 594, pv: 2400, amt: 2400},
];

const useStyles = makeStyles((theme)=>({

}))
const LineChartCustom = (props) => {
  const {width, height, data, dataKey, type} = props;
  const classes = useStyles();
  console.log("props", props);
  return (
    <LineChart width={width} height={height} data={data}>
      <Line type={type?type:`monotone`} dataKey={dataKey} stroke={`#2196f3`} />
      <CartesianGrid stroke="#000" strokeDasharray="5 5" />
      <XAxis dataKey="name"/>
      <YAxis />
    </LineChart>
  )
}

export default LineChartCustom
