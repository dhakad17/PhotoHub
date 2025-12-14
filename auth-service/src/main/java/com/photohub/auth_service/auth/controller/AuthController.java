package com.photohub.auth_service.auth.controller;

import com.photohub.auth_service.auth.dto.AuthResponse;
import com.photohub.auth_service.auth.dto.LoginRequest;
import com.photohub.auth_service.auth.dto.RegisterRequest;
import com.photohub.auth_service.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/otp/send")
    public ResponseEntity<String> sendOtp(@RequestBody com.photohub.auth_service.auth.dto.OtpRequest request) {
        authService.sendOtp(request.getEmail());
        return ResponseEntity.ok("OTP sent to your email");
    }

    @PostMapping("/otp/login")
    public ResponseEntity<AuthResponse> verifyOtp(
            @RequestBody com.photohub.auth_service.auth.dto.OtpLoginRequest request) {
        return ResponseEntity.ok(authService.loginWithOtp(request.getEmail(), request.getOtp()));
    }
}
