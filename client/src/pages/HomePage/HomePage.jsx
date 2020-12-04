import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewHobby } from "../../actions/hobby";
import LineChartCustom from "../../components/LineChartCustom/LineChartCustom";
import { axiosHeroku } from "../../ultils/api";

/* 
    <div className="flex h-screen">
        <h3>Welcome Home</h3>
        <Link to='/authorization'>Authorization</Link>
*/
const randomNumber = ()=> {
  return 1000+Math.random();
}
const data = [
  {name: 'Page A', uv: 787, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 536, pv: 2400, amt: 2400},
  {name: 'Page C', uv: 567, pv: 2400, amt: 2400},
  {name: 'Page D', uv: 594, pv: 2400, amt: 2400},
];

export default function HomePage() {
  const [PayoutStatus, setPayoutStatus] = useState(null);

  const fecthPayoutStatus = async ()=>{
    await axiosHeroku.get('/analysis/finance/payout/status/get')
    .then(res=>{
      console.log(res.data);
      setPayoutStatus(res.data);
    })
  }
  
  useEffect(() => {

    fecthPayoutStatus();
  }, [])
  
  return (
      <Grid xs={10}>
      <LineChartCustom width={400} height={400} data={data}/>
      </Grid>
  );
}