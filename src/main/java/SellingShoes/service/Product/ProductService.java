package SellingShoes.service.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import SellingShoes.com.storage.StorageService;

import java.nio.charset.StandardCharsets;

import com.lazada.lazop.api.LazopClient;
import com.lazada.lazop.api.LazopRequest;
import com.lazada.lazop.api.LazopResponse;
import com.lazada.lazop.util.FileItem;

@Service
public class ProductService {

	@Autowired
	private StorageService storageService;

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
	public String createProduct(String accessToken, String LazUrl, String appkey, String appSecret,
			String payload) {
		LazopClient client = new LazopClient(LazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		LazopResponse response = new LazopResponse();
		request.setApiName("/product/create");
		//request.setHttpMethod("POST");
		try {
		String result = java.net.URLDecoder.decode(payload, StandardCharsets.UTF_8.name());
		request.addApiParameter("payload", result);
		System.out.println("---------res Service--------------");
			
			response = client.execute(request, accessToken);
			System.out.println(result);
			System.out.println(response.getBody());
			Thread.sleep(10);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("---------res Service--------------");

		return response.getBody();
	}
	
	//Upload Image
	public String uploadImage(String accessToken, String LazUrl, String appkey, String appSecret,
			String file) {
		LazopClient client = new LazopClient(LazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/image/upload");
		FileItem fileImage=new FileItem(file);
		request.addFileParameter("image",fileImage);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);	
			System.out.println(response.getBody());
			Thread.sleep(10);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			System.out.println("cleared storage file");
		}
		return response.getBody();
	}
	//get Brands
	public String getBrands(String accessToken, String lazUrl, String appkey, String appSecret,			
			String offset,
			String limit) {		
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/brands/get");
		request.setHttpMethod("GET");
		request.addApiParameter("offset", offset);
		request.addApiParameter("limit", limit);
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
	//get Product Item
	public String getProductItem(String accessToken, String lazUrl, String appkey, String appSecret,			
			String item_id,
			String seller_sku) {		
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/product/item/get");
		request.setHttpMethod("GET");
		request.addApiParameter("item_id", item_id);
		request.addApiParameter("seller_sku", seller_sku);
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
	//remove Product
	public String removeProduct(String accessToken, String lazUrl, String appkey, String appSecret,			
			String seller_sku_list) {		
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/product/remove");
		String sellerSkiListDecode = "";

		try{
			sellerSkiListDecode = java.net.URLDecoder.decode(seller_sku_list, StandardCharsets.UTF_8.name());
			System.out.println(sellerSkiListDecode);
		} catch (Exception e) {
			e.printStackTrace();
		}

		request.addApiParameter("seller_sku_list", sellerSkiListDecode);

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

	//update Product
	public String updateProduct(String accessToken, String lazUrl, String appkey, String appSecret,			
			String payload) {		
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/product/update");
		request.addApiParameter("payload", payload);
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
