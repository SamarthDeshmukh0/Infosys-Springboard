package com.example.usermanagement.service;

import com.example.usermanagement.model.Product;
import com.example.usermanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    // Initialize dummy data when application starts
    @PostConstruct
    public void initializeProducts() {
        if (productRepository.count() == 0) {
            // Create dummy products
            Product[] products = {
                new Product(null, "Cricket Bat", "Sports", 1200.00, 50, "Premium quality cricket bat"),
                new Product(null, "Tennis Ball", "Sports", 80.00, 200, "Pack of 3 tennis balls"),
                new Product(null, "Football", "Sports", 450.00, 100, "FIFA approved football"),
                new Product(null, "Toy Car", "Toys", 250.00, 150, "Remote control toy car"),
                new Product(null, "Doll House", "Toys", 800.00, 75, "3-story doll house"),
                new Product(null, "Puzzle Set", "Toys", 350.00, 120, "500 pieces puzzle"),
                new Product(null, "School Bag", "Bags", 600.00, 90, "Water resistant school bag"),
                new Product(null, "Laptop Bag", "Bags", 950.00, 60, "Padded laptop backpack"),
                new Product(null, "Travel Bag", "Bags", 1500.00, 40, "Large travel duffle bag"),
                new Product(null, "Action Figure", "Toys", 400.00, 180, "Superhero action figure")
            };
            
            for (Product product : products) {
                productRepository.save(product);
            }
        }
    }
    
    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    
    // Get total items and total price
    public Map<String, Object> getTotalItemsAndPrice() {
        List<Product> products = productRepository.findAll();
        
        int totalItems = products.stream()
            .mapToInt(Product::getQuantity)
            .sum();
        
        double totalPrice = products.stream()
            .mapToDouble(p -> p.getPrice() * p.getQuantity())
            .sum();
        
        Map<String, Object> result = new HashMap<>();
        result.put("totalItems", totalItems);
        result.put("totalPrice", totalPrice);
        result.put("productCount", products.size());
        
        return result;
    }
}