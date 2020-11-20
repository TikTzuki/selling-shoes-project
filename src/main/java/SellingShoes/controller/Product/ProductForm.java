package SellingShoes.controller.Product;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProductForm {
	private String productName;
	private String price;
	//private MultipartFile file;
}
