package SellingShoes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import SellingShoes.model.Customer;
import SellingShoes.repository.CustomerRepository;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository repository;

    public List<Customer> getCustomer(){
        return repository.findAll();
    }


    public Customer saveCustomer(Customer cus){
        return repository.save(cus);
    }
    //search
    public Customer getProductById(long customer_id){
        return repository.findById(customer_id).orElse(null);
    }
    public  Customer getProductByName(String name){
        return repository.findByName(name);
    }
    public String deleteCustomer(long customer_id){
         repository.deleteById(customer_id);
         return "Delete success"+customer_id;
    }
    public Customer updateCustomer(Customer customer){
        Customer existingCustomer = repository.findById(customer.getCustomer_id()).orElse(null);
        existingCustomer.setCustomerName(customer.getCustomerName());
        existingCustomer.setCustomerPhoneNumber(customer.getCustomerPhoneNumber());
        existingCustomer.setCustomerAddress(customer.getCustomerAddress());
        existingCustomer.setCustomerEmail(customer.getCustomerEmail());
        return  repository.save(existingCustomer);

    }
}
