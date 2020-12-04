package SellingShoes.controller.Analysis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import SellingShoes.service.Analysis.AnalysisService;

@Controller
@RequestMapping("/analysis")
class AnalysisController {
	@Value("${laz.accessToken}")
	private String accessToken;
	@Value("${laz.url}")
	public String lazUrl;
	@Value("${laz.appkey}")
	private String appkey;
	@Value("${laz.appSecret}")
	private String appSecret;
	@Autowired
	AnalysisService analysisService;
	
	@RequestMapping(value="/finance/payout/status/get", method = RequestMethod.GET)
	public ResponseEntity<String> financePayoutStatusGet(
			@RequestParam(name = "created_after", required = false, defaultValue = "2020-08-01") String createdAfter){
		String responseJson = analysisService.getPayoutStatusLaz(accessToken, lazUrl, appkey, appSecret, createdAfter);
		return new ResponseEntity<String>(responseJson, HttpStatus.OK);
	}
	
	@RequestMapping(value="/finance/transaction/detail/get", method = RequestMethod.GET)
	public ResponseEntity<String> financeTransactionDetailGet(
			@RequestParam(name = "trans_type", required = false, defaultValue = "-1") String transType,
			@RequestParam(name = "start_time", required = false, defaultValue = "2020-12-01") String startTime,
			@RequestParam(name = "end_time", required = false, defaultValue = "2020-12-04") String endTime,
			@RequestParam(name = "limit", required = false, defaultValue = "100") String limit,
			@RequestParam(name = "offset", required = false, defaultValue = "0") String offset){
		
		String responseJson = analysisService.getTransactionDetails(accessToken, lazUrl, appkey, appSecret, transType, startTime, endTime, limit, offset);
		return new ResponseEntity<String>(responseJson, HttpStatus.OK);
	}
}