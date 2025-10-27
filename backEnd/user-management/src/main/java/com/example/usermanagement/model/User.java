package com.example.usermanagement.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String fullName;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String role;
    
    @Column(nullable = false)
    private String department;
    
    @Column(nullable = false)
    private String phoneNumber;
    
    @Column(nullable = false)
    private String warehouseLocation;
    
    // Default Constructor
    public User() {
    }
    
    // Parameterized Constructor
    public User(Long id, String fullName, String email, String password, String role, 
                String department, String phoneNumber, String warehouseLocation) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.department = department;
        this.phoneNumber = phoneNumber;
        this.warehouseLocation = warehouseLocation;
    }
    
    // Getters
    public Long getId() {
        return id;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public String getRole() {
        return role;
    }
    
    public String getDepartment() {
        return department;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public String getWarehouseLocation() {
        return warehouseLocation;
    }
    
    // Setters
    public void setId(Long id) {
        this.id = id;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public void setDepartment(String department) {
        this.department = department;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public void setWarehouseLocation(String warehouseLocation) {
        this.warehouseLocation = warehouseLocation;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", department='" + department + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", warehouseLocation='" + warehouseLocation + '\'' +
                '}';
    }
}