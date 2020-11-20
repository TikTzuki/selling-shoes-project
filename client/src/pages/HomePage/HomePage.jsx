import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewHobby } from "../../actions/hobby";

/* 
    <div className="flex h-screen">
        <h3>Welcome Home</h3>
        <Link to='/authorization'>Authorization</Link>
*/
const randomNumber = ()=> {
  return 1000+Math.random();
}
export default function HomePage() {
  const hobbyList = useSelector(state=>(state.hobby.list));
  const dispatch = useDispatch();
  console.log(hobbyList);
  const handleAddHobbyClick = ()=>{
    const newId = randomNumber();
    const newHobby = {
      id: newId,
      title: `title ${newId}`,
    }
    dispatch(addNewHobby(newHobby));
  }
  
  return (
    <Grid container direction="row">
      <Grid item xs={4}>
        <Button variant="contained" onClick={handleAddHobbyClick}>Random</Button>
      </Grid>
      <Grid item xs={8}>
        <Grid container direction="column">
        {hobbyList.map((hobby)=>{
          return (<Typography key={hobby.id} >{hobby.title}</Typography>)
        })}
        </Grid>
      </Grid>
    </Grid>

  );
}