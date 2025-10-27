package com.example.usermanagement.controller;

import com.example.usermanagement.dto.LoginRequest;
import com.example.usermanagement.dto.LoginResponse;
import com.example.usermanagement.dto.SignupRequest;
import com.example.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    // Test endpoint - GET request
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        System.out.println("=== TEST ENDPOINT CALLED ===");
        return ResponseEntity.ok("Backend is running! Auth Controller is working.");
    }
    
    // Signup endpoint - POST request
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            System.out.println("\n=== SIGNUP REQUEST RECEIVED ===");
            System.out.println("Email: " + request.getEmail());
            System.out.println("Full Name: " + request.getFullName());
            System.out.println("Role: " + request.getRole());
            
            String result = userService.registerUser(request);
            
            if (result.equals("User registered successfully")) {
                System.out.println("✓ SUCCESS: User registered successfully");
                return ResponseEntity.ok(result);
            } else {
                System.out.println("✗ FAILED: " + result);
                return ResponseEntity.badRequest().body(result);
            }
        } catch (Exception e) {
            System.err.println("✗ ERROR during signup:");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Signup failed: " + e.getMessage());
        }
    }
    
    // Login endpoint - POST request
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            System.out.println("\n=== LOGIN REQUEST RECEIVED ===");
            System.out.println("Email: " + request.getEmail());
            
            LoginResponse response = userService.loginUser(request);
            
            if (response.getMessage().equals("Login successful")) {
                System.out.println("✓ SUCCESS: Login successful");
                System.out.println("User: " + response.getFullName());
                System.out.println("Role: " + response.getRole());
                return ResponseEntity.ok(response);
            } else {
                System.out.println("✗ FAILED: " + response.getMessage());
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            System.err.println("✗ ERROR during login:");
            e.printStackTrace();
            LoginResponse errorResponse = new LoginResponse(
                "Login failed: " + e.getMessage(), null, null, null
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }
}