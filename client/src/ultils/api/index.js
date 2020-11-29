import React from 'react'
import axios from 'axios'
const axiosJsonServer  = axios.create({
    baseURL: `http://localhost:3001`,
});
const axiosSpring = axios.create({
  baseURL: `http://localhost:8080`,
})

const axiosHeroku = axios.create({
  //baseURL: `http://localhost:8080`
  baseURL: `https://restful-api-spring-laz.herokuapp.com`,
})
export {
  axiosJsonServer,
  axiosSpring,
  axiosHeroku
}
/*API.delete(`users/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })*/