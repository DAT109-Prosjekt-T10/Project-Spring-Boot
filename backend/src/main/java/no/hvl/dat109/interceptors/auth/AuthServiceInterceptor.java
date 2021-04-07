package no.hvl.dat109.interceptors.auth;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import no.hvl.dat109.util.JWTUtil;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthServiceInterceptor implements HandlerInterceptor {

    String ErrorMessage = "You do not have a valid session token.";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        return true;

//                String token = request.getHeader("Authorization");
//
//                if (token != null) {
//                        System.out.println("Token verified");
//                        return JWTUtil.verifyToken(token);
//                } else {
//                        System.out.println("Token not verified");
//                        response.setStatus(401);
//                        response.getWriter().write(ErrorMessage);
//                        response.getWriter().flush();
//                        return false;
//                }
    }
}