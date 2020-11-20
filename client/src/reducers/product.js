const { default: api } = require("../ultils/api")

const getAllProducts = ()=>{
    api.get('http://localhost:3001/products')
    .then(res => {
        //console.log(res.data.data.products);
        return res.data.data.products;
    })
}
let initialState = {
  pending: false,
  products: [
    {
      "skus": [
        {
          "compatibleVariation": "Màu trắng 39",
          "shopSku": "865970346_VNAMZ-2462028534",
          "sellerSku": "bitisHunter-trangSize39",
          "available": 2,
          "quantity": 2,
          "color_family": "Màu trắng",
          "size": "EU:39",
          "package_height": "15.00",
          "package_width": "20.00",
          "package_length": "30.00",
          "package_weight": "1",
          "price": 899000.0,
          "special_price": 890000.0,
          "special_from_time": "2020-09-29 00:00",
          "special_to_time": "2020-12-31 00:00",
          "images": [
            "https://vn-live.slatic.net/p/461ae39b88a220596f8712527c9b72d8.jpg",
            "https://vn-live.slatic.net/p/93019c48047065e614cc1ff12133e6d0.jpg",
            "https://vn-live.slatic.net/p/838c1e28ae4c37acd9dc54cc4d933b6e.jpg",
            "",
            "",
            "",
            "",
            ""
          ],
          "skuId": 2462028534
        },
        {
          "compatibleVariation": "Màu trắng 40",
          "shopSku": "865970346_VNAMZ-2462028533",
          "sellerSku": "bitisHunter-trangSize40",
          "available": 2,
          "quantity": 2,
          "color_family": "Màu trắng",
          "size": "EU:40",
          "package_height": "15.00",
          "package_width": "20.00",
          "package_length": "30.00",
          "package_weight": "1",
          "price": 899000.0,
          "special_price": 890000.0,
          "special_from_time": "2020-09-29 00:00",
          "special_to_time": "2020-12-31 00:00",
          "images": [
            "https://vn-live.slatic.net/p/461ae39b88a220596f8712527c9b72d8.jpg",
            "https://vn-live.slatic.net/p/93019c48047065e614cc1ff12133e6d0.jpg",
            "https://vn-live.slatic.net/p/838c1e28ae4c37acd9dc54cc4d933b6e.jpg",
            "",
            "",
            "",
            "",
            ""
          ],
          "skuId": 2462028534
        }
      ],
      "product_id": 865970346,
      "category_id": 7528,
      "category_name": "Giày nam",
      "product_name": "Giày bitis hunter nam",
      "short_description": "<p>M&agrave;u: đen</p>\r\n\r\n<p>Chất liệu: vải, nhựa</p>",
      "description": "<p style=\"margin: 0;padding: 8.0px 0;white-space: pre-wrap;\"><span style=\"font-family: none;\">Đây là Miêu tả</span></p>",
      "brand": "No Brand",
      "status": "active",
      "seller_id": 1
    }
  ],
  error: null
};

const productReducer = (state=initialState, action)=>{
    switch (action.type) {
        case 'GET_PRODUCTS_PENDING':
          return {
            ...state,
            pending: true
          }
        case 'GET_PRODUCTS':
            return {
              ...state,
              pending: false,
              products: action.payload
            };
        case 'GET_PRODUCTS_ERROR':
            return {
              ...state,
              pending: false,
              error: action.error
            }
        default:
            return state;
    }
}

export default productReducer;