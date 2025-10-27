package com.example.usermanagement.controller;

import com.example.usermanagement.model.Product;
import com.example.usermanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    // Get all products (for Admin)
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        System.out.println("=== GET ALL PRODUCTS REQUEST ===");
        List<Product> products = productService.getAllProducts();
        System.out.println("✓ Returning " + products.size() + " products");
        return ResponseEntity.ok(products);
    }
    
    // Get total items and price (for User)
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getProductSummary() {
        System.out.println("=== GET PRODUCT SUMMARY REQUEST ===");
        Map<String, Object> summary = productService.getTotalItemsAndPrice();
        System.out.println("✓ Returning summary");
        return ResponseEntity.ok(summary);
    }
}