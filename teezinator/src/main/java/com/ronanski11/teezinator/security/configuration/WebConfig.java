package com.ronanski11.teezinator.security.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Applies CORS to all paths
                .allowedOrigins("*") // Allows requests from any origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Specifies allowed HTTP methods
                .allowedHeaders("*") // Allows all headers
                .allowCredentials(true); // Allows credentials
    }
}
