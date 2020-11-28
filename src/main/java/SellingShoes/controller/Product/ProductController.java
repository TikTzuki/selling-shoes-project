package SellingShoes.controller.Product;

import java.io.IOException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import SellingShoes.com.storage.StorageService;
import SellingShoes.service.Product.ProductService;

@Controller
@RequestMapping("/products")
public class ProductController {
	
	@Value("${laz.accessToken}")
	private String accessToken;
	@Value("${laz.url}")
	public String lazUrl;
	@Value("${laz.appkey}")
	private String appkey;
	@Value("${laz.appSecret}")
	private String appSecret;
	ProductService productService = new ProductService(); // Product Service
	private final StorageService storageService;

	@Autowired
	public ProductController(StorageService storageService) {
		this.storageService = storageService;
	}
	//get Products
	@RequestMapping(method = RequestMethod.GET, value="/get")
	public ResponseEntity<String> productsGet(
			//@RequestHeader("access_token") String accessToken,
			@RequestParam(name = "filter", required = false, defaultValue = "live") String filter,
			@RequestParam(name="search", required = false) String search,
			@RequestParam(name="create_after", required = false, defaultValue ="2020-11-19T00:00:00+0800") String createAfter,
			@RequestParam(name="create_before", required = false) String createBefore,
			@RequestParam(name ="update_after", required = false) String updateAfter,
			@RequestParam(name ="update_before", required = false) String updateBefore,
			@RequestParam(name="offset", required = false, defaultValue = "0") String offset,
			@RequestParam(name="limit",required = false, defaultValue = "10") String limit,
			@RequestParam(name="option", required = false) String option,
			@RequestParam(name="sku_seller_list", required = false) String skuSellerList
			){
		String responseJson = productService.getProducts(accessToken, lazUrl, appkey, appSecret, filter, search, createAfter, createBefore, updateAfter, updateBefore, offset, limit, option, skuSellerList);
		return new ResponseEntity<String>(responseJson,HttpStatus.OK);
	}
	
	//Create Product
	@RequestMapping(method = RequestMethod.POST, value="/create", consumes = "application/json", produces = "application/json")
	public ResponseEntity<String> productCreate(
			@RequestBody ProductForm productForm,
			@RequestParam(name = "payload", required = false) String payload
			){
		
		System.out.println("--------------------");
		System.out.println(productForm);
		System.out.println("--------------------");
		/*String responseJson =*/ productService.createProduct(accessToken, lazUrl, appkey, appSecret, payload);
		//return new ResponseEntity<String>(responseJson,HttpStatus.OK);
		return new ResponseEntity<String>(productForm.toString(), HttpStatus.OK);
	}
	
	//UploadImage
	@RequestMapping(method = RequestMethod.POST, value="/images/upload")
	public ResponseEntity<String> imagesUpload(
			@RequestParam(name="file", required=false) MultipartFile[] files,
			RedirectAttributes redirectAttributes){
			
			for(MultipartFile file : files) {
				storageService.store(file);
				redirectAttributes.addFlashAttribute("message", "You successfully uploaded " + file.getOriginalFilename() + "!");
			}
		
		return new ResponseEntity<String>("{ [{\"image\": \"link of image\"},{\"image\": \"link of image\"}]}", HttpStatus.OK);
	}
	
	//Test form
	@RequestMapping(method = RequestMethod.GET, value="/images/upload")
	public String listUploadedFiless(Model model) throws IOException {

		model.addAttribute("files", storageService.loadAll().map(
				path -> MvcUriComponentsBuilder.fromMethodName(ProductController.class,
						"serveFile", path.getFileName().toString()).build().toUri().toString())
				.collect(Collectors.toList()));
		return "uploadForm";
	}	
	@RequestMapping(method=RequestMethod.GET, value="/files/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
		Resource file = storageService.loadAsResource(filename);
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
				"attachment; filename=\"" + file.getFilename() + "\"").body(file);
	}
	
	// get Brands
	@RequestMapping(method = RequestMethod.GET, value="/brands/get")
	public ResponseEntity<String> brandsGet(			
			@RequestParam(name="offset", required = false, defaultValue = "0") String offset,
			@RequestParam(name="limit",required = false, defaultValue = "10") String limit
			){
		String responseJson = productService.getBrands(accessToken, lazUrl, appkey, appSecret,offset, limit);
		return new ResponseEntity<String>(responseJson,HttpStatus.OK);
	}
	
	// get Product Item
	@RequestMapping(method = RequestMethod.GET, value="/product/item/get")
	public ResponseEntity<String> productItemGet(			
			@RequestParam(name="item_id", required = false) String item_id,
			@RequestParam(name="seller_sku",required = false) String seller_sku
			){
		String responseJson = productService.getProductItem(accessToken, lazUrl, appkey, appSecret,item_id, seller_sku);
		return new ResponseEntity<String>(responseJson,HttpStatus.OK);
	}
	
	//remove Product
	@RequestMapping(method = RequestMethod.GET, value="/product/remove")
	public ResponseEntity<String> productRemove(			
			@RequestParam(name="seller_sku_list",required = false) String seller_sku_list
			){
		String responseJson = productService.removeProduct(accessToken, lazUrl, appkey, appSecret,seller_sku_list);
		return new ResponseEntity<String>(responseJson,HttpStatus.OK);
	}
	
	//update Product
	@RequestMapping(method = RequestMethod.GET, value="/product/update")
	public ResponseEntity<String> productUpdate(			
			@RequestParam(name="payload",required = false) String payload
			){
		String responseJson = productService.updateProduct(accessToken, lazUrl, appkey, appSecret,payload);
		return new ResponseEntity<String>(responseJson,HttpStatus.OK);
	}
		
}
