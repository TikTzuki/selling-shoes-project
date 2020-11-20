package SellingShoes;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import SellingShoes.com.storage.StorageService;

@EnableConfigurationProperties
@SpringBootApplication
public class SellingShoesApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(SellingShoesApplication.class, args);
	}
	  
	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
			storageService.deleteAll();
			storageService.init();
		};
	}
}
