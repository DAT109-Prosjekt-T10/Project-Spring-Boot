package no.hvl.dat109.interceptors.cors;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import no.hvl.dat109.util.Config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;

public class CorsConfig {

    /*
     * Allows global cross origin access to frontend server on port 3000.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins(Config.AllowedOrigin);
            }
        };
    }
}
