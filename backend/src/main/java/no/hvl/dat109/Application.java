package no.hvl.dat109;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
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

	/*
	 * Allows global cross origin access to frontend server on port 3000.
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000")
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}
}
