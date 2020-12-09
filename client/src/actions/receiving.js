export const modifyReceiving=(receiving)=>{
  return {
    type: 'MODIFY_RECEIVING',
    payload: receiving
  }
};

export const addReceivingDetail=(receivingDetail)=>{
  return {
    type: 'ADD_DETAIL',
    payload: receivingDetail
  }
}

export const modifyReceivingDetails=(receivingDetails)=>{
  return {
    type: 'MODIFY_DETAILS',
    payload: receivingDetails
  }
}

export const deleteReceivingDetails=(receivingDetails)=>{
  return {
    type: 'DELETE_DETAILS',
    payload: receivingDetails
  }
}