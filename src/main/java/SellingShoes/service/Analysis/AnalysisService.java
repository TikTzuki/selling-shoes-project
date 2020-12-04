package SellingShoes.service.Analysis;

import org.springframework.stereotype.Service;

import com.lazada.lazop.api.LazopClient;
import com.lazada.lazop.api.LazopRequest;
import com.lazada.lazop.api.LazopResponse;
import com.lazada.lazop.util.ApiException;

@Service
public class AnalysisService {

	//Use this API to get the transaction statements in a specified period.
	public String getPayoutStatusLaz(String accessToken, String lazUrl, String appkey, String appSecret,
			String createdAfter) {
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/finance/payout/status/get");
		request.setHttpMethod("GET");
		request.addApiParameter("created_after", createdAfter);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);
			System.out.println(response.getBody());
			Thread.sleep(10);
		} catch (ApiException | InterruptedException e) {
			e.printStackTrace();
		}

		return response.getBody();
	}
	
	//Use this API to get transaction or fee details in a specified period.
	public String getTransactionDetails(String accessToken, String lazUrl, String appkey, String appSecret,
			String transType, String startTime, String endTime, String limit, String offset) {
		
		LazopClient client = new LazopClient(lazUrl, appkey, appSecret);
		LazopRequest request = new LazopRequest();
		request.setApiName("/finance/transaction/detail/get");
		request.setHttpMethod("GET");
		request.addApiParameter("trans_type", transType);
		request.addApiParameter("start_time", startTime);
		request.addApiParameter("end_time", endTime);
		request.addApiParameter("limit", limit);
		request.addApiParameter("offset", offset);
		LazopResponse response = new LazopResponse();
		try {
			response = client.execute(request, accessToken);
			System.out.println(response.getBody());
			Thread.sleep(10);
		} catch (ApiException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return response.getBody();
	}
}
