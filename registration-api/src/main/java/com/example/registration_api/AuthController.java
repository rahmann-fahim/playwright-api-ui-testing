package com.example.registration_api;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // Registration - Step 1
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Map<String, String> request) {

        String name = request.get("name");
        String email = request.get("email");
        String password = request.get("password");

        // Check required fields
        if (name == null || email == null || password == null
                || name.isBlank()
                || email.isBlank()
                || password.isBlank()) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "All fields are required"
                    ));
        }

        // Check if email already exists
        if (userRepository.existsByEmail(email)) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Email already registered"
                    ));
        }

        // Fixed demo OTP
        String otp = "123456";

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "OTP sent successfully",
                        "otp",
                        otp
                )
        );
    }

    // OTP Verification - Step 2
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(
            @RequestBody Map<String, String> request) {

        String name = request.get("name");
        String email = request.get("email");
        String password = request.get("password");
        String otp = request.get("otp");

        // Check OTP
        if (!"123456".equals(otp)) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Invalid OTP"
                    ));
        }

        // Create user
        User user = new User(
                name,
                email,
                password
        );

        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Registration successful"
                )
        );
    }

    // Login - Step 3
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        // Check required fields
        if (email == null || password == null
                || email.isBlank()
                || password.isBlank()) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Email and password are required"
                    ));
        }

        // Find user by email
        Optional<User> user =
                userRepository.findByEmail(email);

        // User not found
        if (user.isEmpty()) {

            return ResponseEntity.status(401)
                    .body(Map.of(
                            "message",
                            "Invalid email or password"
                    ));
        }

        // Check password
        if (!user.get().getPassword().equals(password)) {

            return ResponseEntity.status(401)
                    .body(Map.of(
                            "message",
                            "Invalid email or password"
                    ));
        }

        // Generate JWT token
        String token = jwtService.generateToken(
                user.get().getEmail()
        );

        // Login successful
        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Login successful",
                        "name",
                        user.get().getName(),
                        "email",
                        user.get().getEmail(),
                        "token",
                        token
                )
        );
    }

    // Get all registered users - Protected Route
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(
            HttpServletRequest request) {

        // Get Authorization header
        String authHeader =
                request.getHeader("Authorization");

        // JWT token required
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            return ResponseEntity.status(401)
                    .body(
                            Map.of(
                                    "message",
                                    "Authentication token required"
                            )
                    );
        }

        // Extract JWT token
        String token =
                authHeader.substring(7);

        // Validate JWT
        if (!jwtService.isTokenValid(token)) {

            return ResponseEntity.status(401)
                    .body(
                            Map.of(
                                    "message",
                                    "Invalid or expired token"
                            )
                    );
        }

        // JWT is valid
        return ResponseEntity.ok(
                userRepository.findAll()
        );
    }
}