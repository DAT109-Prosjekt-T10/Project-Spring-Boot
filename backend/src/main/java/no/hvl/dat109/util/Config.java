package no.hvl.dat109.util;

import java.util.Arrays;
import java.util.List;

import com.auth0.jwt.algorithms.Algorithm;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class Config {

    public static String HTTP = "http://";
    public static String HTTPS = "https://";

    public static String Salt = BCrypt.gensalt();

    private static String secret = "OUR_SUPER_SECRET_SECRET_USE_THIS_AND_ILL_KILL_YOU";
    public static Algorithm algorithm = Algorithm.HMAC256(secret);

    public static String Issuer = "Gruppe-10";

    private static String[] PrivateRoutes = { "/api/author/**", "/api/books/**", "/api/publisher/**" };
    public static List<String> ProtectedRoutes = Arrays.asList(PrivateRoutes);

    private static String[] PublicRoutes = { "/api/user/**", "/" };
    public static List<String> UnprotectedRoutes = Arrays.asList(PublicRoutes);

    public static String[] AllowedOrigins = { HTTP.concat("localhost:3000") };

    public static String[] AllowedMethods = { "GET", "PUT", "POST", "DELETE" };

    public static int ExpireTime = 1000 * 60 * 60 * 24;

}
