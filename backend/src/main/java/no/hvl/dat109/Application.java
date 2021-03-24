package no.hvl.dat109;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import no.hvl.dat109.util.Config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class Application {

	/**
	 * 
	 * Only starts the application
	 * 
	 */
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins(Config.AllowedOrigins).allowedMethods(Config.AllowedMethods);
			}
		};
	}

}
