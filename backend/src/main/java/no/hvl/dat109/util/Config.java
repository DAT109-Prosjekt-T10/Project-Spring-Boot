package no.hvl.dat109.util;

import com.auth0.jwt.algorithms.Algorithm;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class Config {

    public static String Salt = BCrypt.gensalt();

    private static String secret = "OUR_SUPER_SECRET_SECRET_USE_THIS_AND_ILL_KILL_YOU";
    public static Algorithm algorithm = Algorithm.HMAC256(secret);

    public static String Issuer = "Gruppe-10";

}
