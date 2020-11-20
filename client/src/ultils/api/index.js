import React from 'react'
import axios from 'axios'
export default axios.create({
    baseURL: `http://localhost:3001`
});

/*API.delete(`users/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })*/