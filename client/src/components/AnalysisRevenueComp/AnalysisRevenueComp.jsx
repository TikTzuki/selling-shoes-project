import React, { useEffect, useState } from 'react'
import { axiosHeroku } from '../../ultils/api';
import LineChartCustom from '../LineChartCustom/LineChartCustom';

const data = [
  {
    name: "01 Dec 2020",
      amount: 50,
  },
  {
      amount: 90,
      "name": "01 Dec 2020"
  },
  {
      amount: 10,
      "name": "01 Dec 2020"
  }
];

const AnalysisRevenueComp = () => {
  const [revenue, setRevenue] = useState([]);
  const [transaction, setTransaction] = useState([]);
  let transTemp = transaction.map((trans)=>{
    trans.name=trans.transaction_date;
    return trans;
  })
  const fetchData=()=>{
    axiosHeroku.get('analysis/finance/transaction/detail/get?limit=20&trans_type=-1&start_time=2020-12-04&end_time=2020-12-04')
    .then(res=>{
      setTransaction(res.data.data);
      console.log(res.data.data);
    })
  }
  
  useEffect(() => {
    fetchData();
  }, [])
  
  return (
    <div>
      <LineChartCustom width={800} height={800} data={transTemp} dataKey="amount"/>
    </div>
  )
}

export default AnalysisRevenueComp
