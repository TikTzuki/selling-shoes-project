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
				@RequestParam(name="sort_direction", required = false, defaultValue = "DECS") String sortDirection,
				@RequestParam(name="sort_by", required = false, defaultValue = "updated_at") String sortBy){
		
		String responseJson = lazOrderService.getOrders(accessToken, lazUrl, appkey, appSecret, createBefore, createAfter, updateBefore, updateAfter, status, offset, limit, sortDirection, sortBy);
		return new ResponseEntity<String>(responseJson, HttpStatus.OK);
	}
	
	//GetMultipleOrderItems: Lay nhieu order item tu nhieu order
	@RequestMapping(method = RequestMethod.GET, value="/items/get")
	public ResponseEntity<String> lazOrdersItemsGet(@RequestParam("order_ids") String orderIds){
		return new ResponseEntity<String>("", HttpStatus.OK);
	}
	
	//SetInvoiceNumber
	
	//SetStatusToReadyToShip 
	
}
