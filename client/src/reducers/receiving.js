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
    quanity_received: 10,
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
    case 'ADD_DETAILS':
      return {
        ...state,
        receiving_details: [
          ...state.receiving_details,
          ...action.payload
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