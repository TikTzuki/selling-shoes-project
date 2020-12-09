import { date2date, date2str } from "../ultils/format/formatDate"

const initialState = {
  description: "description",
  create_date: date2date(new Date().toLocaleDateString().toString()),
  date_received: date2date(new Date().toLocaleDateString().toString()),
  provider: "",
  telephone: "",
  address: "",
  status: "pending",
  receiving_details: [{
    shop_sku: "",
    seller_sku: "seller-sku",
    name: "name of shoe",
    color: "Trang",
    size: "EU:40",
    quantity_received: 10,
    quantity_approved: 10,
    price: 20000
  }]
}

const receivingReducer = (state=initialState, action)=>{
  switch (action.type) {
    case 'MODIFY_RECEIVING':
      return {
        ...state,
        receiving_details: [
          ...action.payload
        ]
      }
    case 'ADD_DETAIL':
      let receivingDetailsTemp = [...state.receiving_details];
      let isContain = false;
      receivingDetailsTemp.forEach((receiDetail, index)=>{
        if(action.payload[0].shop_sku===receiDetail.shop_sku){
          receiDetail.quantity_received += action.payload[0].quantity_received;
          receiDetail.quantity_approved += action.payload[0].quantity_approved;
          isContain=true;
        }
      })
      if(!isContain){
        receivingDetailsTemp.push(action.payload[0]);
      }
      console.log(receivingDetailsTemp)
      return {
        ...state,
        receiving_details: [
          ...receivingDetailsTemp
        ]
      }
    case 'MODIFY_DETAILS':
      return {
        ...state,
        receiving_details: [
          ...action.payload
        ]
      }
    default:
      return state;
  }
}
export default receivingReducer