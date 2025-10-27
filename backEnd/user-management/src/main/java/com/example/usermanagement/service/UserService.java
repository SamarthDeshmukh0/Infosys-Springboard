package com.example.usermanagement.service;

import com.example.usermanagement.dto.LoginRequest;
import com.example.usermanagement.dto.LoginResponse;
import com.example.usermanagement.dto.SignupRequest;
import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    // Register new user
    public String registerUser(SignupRequest request) {
        try {
            System.out.println("=== UserService: registerUser called ===");
            
            // Null checks
            if (request == null) {
                return "Invalid request";
            }
            
            // Validate input
            if (request.getFullName() == null || request.getFullName().trim().isEmpty()) {
                return "Full name is required";
            }
            
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return "Email is required";
            }
            
            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                return "Password is required";
            }
            
            if (request.getConfirmPassword() == null) {
                return "Confirm password is required";
            }
            
            // Check if passwords match
            if (!request.getPassword().equals(request.getConfirmPassword())) {
                return "Passwords do not match";
            }
            
            // Check if email already exists
            if (userRepository.existsByEmail(request.getEmail())) {
                return "Email already registered";
            }
            
            // Create new user
            User user = new User();
            user.setFullName(request.getFullName());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword());
            user.setRole(request.getRole() != null ? request.getRole() : "User");
            user.setDepartment(request.getDepartment() != null ? request.getDepartment() : "General");
            user.setPhoneNumber(request.getPhoneNumber() != null ? request.getPhoneNumber() : "0000000000");
            user.setWarehouseLocation(request.getWarehouseLocation() != null ? request.getWarehouseLocation() : "Mumbai");
            
            // Save to database
            User savedUser = userRepository.save(user);
            
            System.out.println("✓ User saved successfully: " + savedUser.getEmail());
            System.out.println("User ID: " + savedUser.getId());
            
            return "User registered successfully";
            
        } catch (Exception e) {
            System.err.println("✗ Error in registerUser:");
            System.err.println("Error message: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getName());
            e.printStackTrace();
            return "Registration failed: " + e.getMessage();
        }
    }
    
    // Login user
    public LoginResponse loginUser(LoginRequest request) {
        try {
            System.out.println("=== UserService: loginUser called ===");
            
            // Null checks
            if (request == null) {
                return new LoginResponse("Invalid request", null, null, null);
            }
            
            // Validate input
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return new LoginResponse("Email is required", null, null, null);
            }
            
            if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
                return new LoginResponse("Password is required", null, null, null);
            }
            
            System.out.println("Looking for user with email: " + request.getEmail());
            
            Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
            
            if (userOptional.isEmpty()) {
                System.out.println("✗ User not found");
                return new LoginResponse("User not found", null, null, null);
            }
            
            User user = userOptional.get();
            System.out.println("✓ User found: " + user.getEmail());
            
            // Check password
            if (!user.getPassword().equals(request.getPassword())) {
                System.out.println("✗ Invalid password");
                return new LoginResponse("Invalid password", null, null, null);
            }
            
            System.out.println("✓ Password correct");
            System.out.println("✓ Login successful for: " + user.getFullName());
            
            return new LoginResponse(
                "Login successful", 
                user.getRole(), 
                user.getFullName(),
                user.getEmail()
            );
            
        } catch (Exception e) {
            System.err.println("✗ Error in loginUser:");
            System.err.println("Error message: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getName());
            e.printStackTrace();
            return new LoginResponse("Login failed: " + e.getMessage(), null, null, null);
        }
    }
}