package SellingShoes.controller.LazOrder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import SellingShoes.service.LazOrder.LazOrderService;

@Controller
@RequestMapping("/laz-orders")
public class LazOrderController {
	
	@Value("${laz.accessToken}")
	private String accessToken;
	@Value("${laz.url}")
	public String lazUrl;
	@Value("${laz.appkey}")
	private String appkey;
	@Value("${laz.appSecret}")
	private String appSecret;
	LazOrderService lazOrderService = new LazOrderService();
	
	//GetOrders: Lay tat ca order
	@RequestMapping(method = RequestMethod.GET, value="/get")
	public ResponseEntity<String> lazOrdersGet(
				@RequestParam(name = "created_before", required = false) String createBefore,
				@RequestParam(name = "created_after", required = false, defaultValue = "2020-11-01T00:00:00+0800") String createAfter,
				@RequestParam(name = "update_before", required = false) String updateBefore,
				@RequestParam(name = "update_after", required = false) String updateAfter,
				@RequestParam(name = "status", required = false, defaultValue = "pending") String status,
				@RequestParam(name="offset", required = false) String offset,
				@RequestParam(name = "limit", required = false) String limit,
				@RequestParam(name="sort_direction", required = false) String sortDirection,
				@RequestParam(name="sort_by", required = false) String sortBy){
		
		String responseJson = lazOrderService.getOrders(accessToken, lazUrl, appkey, appSecret, createBefore, createAfter, updateBefore, updateAfter, status, offset, limit, sortDirection, sortBy);
		return new ResponseEntity<String>(responseJson, HttpStatus.OK);
	}
	
	//GetMultipleOrderItems: Lay nhieu order item tu nhieu order
	@RequestMapping(method = RequestMethod.GET, value="/items/get")
	public ResponseEntity<String> lazOrdersItemsGet(
			@RequestParam(name ="order_ids", required =false ) String orderIds){
		String responseJson = lazOrderService.getMultipleOrderItems(accessToken, lazUrl, appkey, appSecret, orderIds);
		return new ResponseEntity<String>(responseJson, HttpStatus.OK);
	}
	
	//GetOrder : Lay 1 order
	@RequestMapping(method = RequestMethod.GET, value="/order/get")
	public ResponseEntity<String> lazOrderGet(
			@RequestParam(name ="order_id", required =false ) String orderId){
		String responseJson = lazOrderService.getOrder(accessToken, lazUrl, appkey, appSecret, orderId);
		return new ResponseEntity<String>(responseJson, HttpStatus.OK);
	}
	
	//GetOrderItems: Lay nhieu order item tu 1 order
	@RequestMapping(method = RequestMethod.GET, value="/order/items/get")
	public ResponseEntity<String> lazOrderItemsGet(
			@RequestParam(name= "order_id", required= false) String orderId){
		String responseJson= lazOrderService.getOrderItems(accessToken, lazUrl, appkey, appSecret, orderId); 
		return new ResponseEntity<String>(responseJson, HttpStatus.OK);
		
	}
	
	//SeStatusToCanceled
	@RequestMapping(method = RequestMethod.POST, value="/cancel")
	public ResponseEntity<String> lazOrderCacel(
			@RequestParam(name="reason_detail", required =false) String reasonDetail,
			@RequestParam(name="reason_id", required =false) String reasonId,
			@RequestParam(name="order_item_id", required =false) String orderItemId){
		String responseJson = lazOrderService.canceled(accessToken, lazUrl, appkey, appSecret, reasonDetail, reasonId, orderItemId);
		return new ResponseEntity<String>(responseJson, HttpStatus.OK);
	}
	//SetInvoiceNumber
	
	//SetStatusToReadyToShip 
	@RequestMapping(method = RequestMethod.POST, value="/rts")
	public ResponseEntity<String> lazorderRts(
			@RequestParam(name ="order_item_ids", required=false) String orderItemIds,
			@RequestParam(name ="delivery_type", required=false, defaultValue="dropship") String deliveryType,
			@RequestParam(name ="shipment_provider", required=false) String shipmentProvider,
			@RequestParam(name ="tracking_number", required=false) String trackingNumber)	
	{
		String responseJson = lazOrderService.readyToShip(accessToken, lazUrl, appkey, appSecret, orderItemIds, deliveryType, shipmentProvider, trackingNumber);
		return new ResponseEntity<String>(responseJson, HttpStatus.OK);
	}
}
