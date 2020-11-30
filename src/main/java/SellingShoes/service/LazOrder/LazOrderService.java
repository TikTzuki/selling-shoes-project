package SellingShoes.service.LazOrder;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.lazada.lazop.api.LazopClient;
import com.lazada.lazop.api.LazopRequest;
import com.lazada.lazop.api.LazopResponse;
import com.lazada.lazop.util.ApiException;

@Service
public class LazOrderService {
	
	public String getOrders(
			String accessToken, String lazUrl, String appkey, String appSecret,
			String createBefore,
			String createAfter,
			String updateBefore,
			String updateAfter,
			String status,
			String offset,
			String limit,
			String sortDirection,
			String sortBy) {
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/orders/get");
		request.setHttpMethod("GET");
		request.addApiParameter("created_after", createAfter);
		request.addApiParameter("created_before", createBefore);
		request.addApiParameter("status", status);
		request.addApiParameter("update_before", updateBefore);
		request.addApiParameter("update_after", updateAfter);
		request.addApiParameter("limit", limit);
		request.addApiParameter("offset", offset);
		request.addApiParameter("sort_direction", sortDirection);
		request.addApiParameter("sort_by", sortBy);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);
			System.out.println(response.getBody());
			Thread.sleep(10);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e);
		}
		return response.getBody();
	}

public String getMultipleOrderItems(
			String accessToken, String lazUrl, String appkey, String appSecret,
			String orderIds) {
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/orders/items/get");
		request.setHttpMethod("GET");
		request.addApiParameter("order_ids", orderIds);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);
			System.out.println(response.getBody());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e);
		}
		return response.getBody();
	}
	
public String getOrder(
			String accessToken, String lazUrl, String appkey, String appSecret,
			String orderId) {
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/order/get");
		request.setHttpMethod("GET");
		request.addApiParameter("order_id", orderId);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);
			System.out.println(response.getBody());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e);
		}
		return response.getBody();
	}

public String getOrderItems(
			String accessToken, String lazUrl, String appkey, String appSecret,
			String orderId) {
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/order/items/get");
		request.setHttpMethod("GET");
		request.addApiParameter("order_id", orderId);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);
			System.out.println(response.getBody());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e);
		}
		return response.getBody();
	}
	
	public String canceled(
			String accessToken, String lazUrl, String appkey, String appSecret,
			String reasonDetail,
			String reasonId,
			String orderItemId) {
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/order/cancel");
		request.setHttpMethod("POST");
		request.addApiParameter("reason_detail", reasonDetail);
		request.addApiParameter("reason_id", reasonId);
		request.addApiParameter("order_item_id", orderItemId);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);
			System.out.println(response.getBody());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e);
		}
		return response.getBody();
	}

public String readyToShip(
			String accessToken, String lazUrl, String appkey, String appSecret,
			String orderItemIds,
			String deliveryType,
			String shipmentProvider,
			String trackingNumber) {
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/order/rts");
		request.setHttpMethod("POST");
		request.addApiParameter("order_item_ids", orderItemIds);
		request.addApiParameter("delivery_type", deliveryType);
		request.addApiParameter("shipment_provider", shipmentProvider);
		request.addApiParameter("tracking_number", trackingNumber);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);
			System.out.println(response.getBody());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println(e);
		}
		return response.getBody();
	}
}
