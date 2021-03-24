package no.hvl.dat109.interceptors.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import no.hvl.dat109.util.Config;

/**
 * ItemServiceInterceptorAppConfig to register Interceptor class.
 */
@Configuration
public class AuthInterceptorConfig implements WebMvcConfigurer {

    @Autowired
    AuthServiceInterceptor interceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(interceptor).addPathPatterns(Config.ProtectedRoutes)
                .excludePathPatterns(Config.UnprotectedRoutes);
    }
}