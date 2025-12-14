package com.photohub.auth_service.auth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtConfig {
    private String secret = "ZmRzYWZkc2FmZHNhamZkc2xrdmNjeHZua2ZkbHZubmZkc2xndm5kbHNrdm5ka3Nqdm5"; // 256-bit safe
                                                                                                   // secret
    private long expiration = 86400000; // 1 day
}
