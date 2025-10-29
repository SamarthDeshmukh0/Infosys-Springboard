package net.java.inventory_app.repository;

import net.java.inventory_app.entity.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Additional custom queries can be added here if needed
    // For example:
     List<Product> findByNameContaining(String name);
     List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
}