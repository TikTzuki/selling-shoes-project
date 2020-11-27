package SellingShoes.service.Product;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.lazada.lazop.api.LazopClient;
import com.lazada.lazop.api.LazopRequest;
import com.lazada.lazop.api.LazopResponse;

@Service
public class ProductService {
	
	//Get product
	public String getProducts(String accessToken, String lazUrl, String appkey, String appSecret,
			String filter,
			String search, 
			String createAfter,
			String createBefore,
			String updateAfter,
			String updateBefore,
			String offset,
			String limit, 
			String option,
			String skuSellerList) {
		
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/products/get");
		request.setHttpMethod("GET");
		request.addApiParameter("filter", filter);
		request.addApiParameter("search", search);
		request.addApiParameter("create_after", createAfter);
		request.addApiParameter("create_before", createBefore);
		request.addApiParameter("update_before", updateBefore);
		request.addApiParameter("update_after", updateAfter);
		request.addApiParameter("offset", offset);
		request.addApiParameter("limit", limit);
		request.addApiParameter("options", option);
		request.addApiParameter("sku_seller_list", skuSellerList);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);
			Thread.sleep(10);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//System.out.println(response.getBody());
		return response.getBody();
	}

	//Create product
	public String createProduct() {
		
		return new String("create product success");
	}
	
	/* Bien skus gan giong:
	 	<Sku>
			<SellerSku>api-create-test-1</SellerSku>
			<color_family>Green</color_family>
			<size>40</size>
			<quantity>1</quantity>
			<price>388.50</price>
			<package_length>11</package_length>
			<package_height>22</package_height>
			<package_weight>33</package_weight>
			<package_width>44</package_width>
			<package_content>this is what's in the box</package_content>
			<Images>
				<Image>http://sg.s.alibaba.lzd.co/original/59046bec4d53e74f8ad38d19399205e6.jpg</Image>
				<Image>http://sg.s.alibaba.lzd.co/original/179715d3de39a1918b19eec3279dd482.jpg</Image>
			</Images>
		</Sku>
	 */
}
