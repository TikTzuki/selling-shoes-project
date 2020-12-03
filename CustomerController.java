+package SellingShoes.controller;
+
+import org.springframework.beans.factory.annotation.Autowired;
+import org.springframework.web.bind.annotation.*;
+import SellingShoes.model.Customer;
+import SellingShoes.service.CustomerService;
+
+import java.util.List;
+
+@RestController
+@RequestMapping("customer")
+
+public class CustomerController {
+    @Autowired
+    private CustomerService service;
+    @GetMapping("/Customers")
+    public List<Customer> findAllCustomer() {
+        return service.getCustomer();
+    }
+    @PostMapping("/addCustomer")
+    public Customer addCustomer(@RequestBody Customer customer){
+        return service.saveCustomer(customer);
+    }
+    @GetMapping("/customer/{id}")
+     public Customer getCustomerById(@PathVariable long id){
+        return service.getProductById(id);
+     }
+    @GetMapping("/customer/{name}")
+    public Customer getCustomerById(String name){
+        return service.getProductByName(name);
+    }
+    @PutMapping("/update")
+    public Customer updateCustomer(@RequestBody Customer customer){
+        return service.updateCustomer(customer);
+    }
+    @DeleteMapping("/delete")
+    public String deleteCustomer(@PathVariable long id){
+        return  service.deleteCustomer(id);
+    }
+}