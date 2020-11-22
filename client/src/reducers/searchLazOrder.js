const initialState = {
  created_before: ``,
  created_after: ``,
  update_before: ``,
  update_after: ``,
  status: `pending`,
  offset: `0`,
  limit: `10`,
  sort_direction: `DESC`,
  sort_by: ``,
  statement: ``
}

const searchLazorder = (state = initialState, action)=>{
  const payload=action.payload;
  switch (action.type) {
    case 'SEARCH':
      let statement='';
      console.log("searching laz order")
      for (let prop in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, prop)) {
          if(prop.includes("before")||prop.includes("after")){
            statement+= Boolean(payload[`${prop}`]) ? `&${prop}=${payload[`${prop}`]}T00:00:00+08:00` : '';
          } else {
            statement+= Boolean(payload[`${prop}`]) ? `&${prop}=${payload[`${prop}`]}` : '';
          }
        }
    }
      return {
        ...state,
        ...payload,
        statement: statement
      }
    default:
      return state;
  }
}

export default searchLazorder