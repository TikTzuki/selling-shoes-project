package SellingShoes.controller.Product;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import SellingShoes.service.Product.ProductService;

@Controller
@RequestMapping("/products")
public class ProductController {
	
	//ProductSerivce productService = new ProductService();
	@RequestMapping(method = RequestMethod.GET, value="")
	public ResponseEntity<String> products(){
		//TODO: get all products
		return new ResponseEntity<String>("all products", HttpStatus.OK);
	}
}
