package SellingShoes.service.Product;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.lazada.lazop.api.LazopClient;
import com.lazada.lazop.api.LazopRequest;
import com.lazada.lazop.api.LazopResponse;

@Service
public class ProductService {
	@Value("${laz.url}")
	private String url;
	@Value("${laz.appkey}")
	private String appkey;
	@Value("${laz.appSecret}")
	private String appSecret;
	
	//Current service
	public String getProducts(String accessToken, String filter,String search, String offset, String limit, String skuSellerList) {
		LazopClient client = new LazopClient(this.url, this.appkey, this.appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/products/get");
		request.setHttpMethod("GET");
		request.addApiParameter("filter", filter);
		//request.addApiParameter("update_before", "2018-01-01T00:00:00+0800");
		request.addApiParameter("search", search);
		//request.addApiParameter("create_before", "2018-01-01T00:00:00+0800");
		request.addApiParameter("offset", "0");
		request.addApiParameter("create_after", "2010-01-01T00:00:00+0800");
		request.addApiParameter("limit", "20");
		//request.addApiParameter("options", "1");
		request.addApiParameter("sku_seller_list", skuSellerList);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);
			Thread.sleep(10);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return response.getBody();
	}
}
