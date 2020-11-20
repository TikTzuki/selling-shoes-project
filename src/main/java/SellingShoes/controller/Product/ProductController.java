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
import SellingShoes.model.Product.ProductForm;
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
	@RequestMapping(method = RequestMethod.GET, value="/get")
	public ResponseEntity<String> productsGet(
			//@RequestHeader("access_token") String accessToken,
			@RequestParam(name = "filter", required = false, defaultValue = "inactive") String filter,
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
	
	@RequestMapping(method = RequestMethod.GET, value="/create")
	public String listUploadedFiles(Model model) throws IOException {

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
	
	@RequestMapping(method = RequestMethod.POST, value="/create", consumes = "application/json", produces = "application/json")
	public ResponseEntity<String> productCreate(
			//@RequestHeader(required = false) String header,
			//@RequestBody(required = false) ProductForm productForm,
			//@RequestParam(name="productName", required=false) String productName,
			//@RequestParam(name="price", required=false) String price,
			//@RequestParam(name="file", required=false) MultipartFile file,
			//RedirectAttributes redirectAttributes
			@RequestBody ProductForm productForm
			){
			
			System.out.println("--------------------");
			//System.out.println(productName);
			//System.out.println( price);
			//System.out.println(file);
			System.out.println(productForm);
			System.out.println("--------------------");
			
			//storageService.store(file);
			
			
		//redirectAttributes.addFlashAttribute("message", "You successfully uploaded " + file.getOriginalFilename() + "!");
		return new ResponseEntity<String>(productForm.toString(), HttpStatus.OK);
	}
	
	//UploadImage
	@RequestMapping(method = RequestMethod.POST, value="/image/upload")
	public ResponseEntity<String> imageUpload(){
		
		return new ResponseEntity<String>("responseJson", HttpStatus.OK);
	}
	
}
