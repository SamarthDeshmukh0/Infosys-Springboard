package com.example.usermanagement.dto;

public class SignupRequest {
    
    private String fullName;
    private String email;
    private String password;
    private String confirmPassword;
    private String role;
    private String department;
    private String phoneNumber;
    private String warehouseLocation;
    
    // Default Constructor
    public SignupRequest() {
    }
    
    // Parameterized Constructor
    public SignupRequest(String fullName, String email, String password, String confirmPassword, 
                        String role, String department, String phoneNumber, String warehouseLocation) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.role = role;
        this.department = department;
        this.phoneNumber = phoneNumber;
        this.warehouseLocation = warehouseLocation;
    }
    
    // Getters
    public String getFullName() {
        return fullName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public String getConfirmPassword() {
        return confirmPassword;
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
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
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
        return "SignupRequest{" +
                "fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", department='" + department + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", warehouseLocation='" + warehouseLocation + '\'' +
                '}';
    }
}