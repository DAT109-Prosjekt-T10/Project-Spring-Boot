package no.hvl.dat109.util;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import ch.qos.logback.core.joran.conditional.ThenAction;

public class JWTUtil {

    public static String createToken(String id, boolean admin) {

        String token = null;
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", id);
        payload.put("admin", admin);

        Calendar TimeNow = Calendar.getInstance();
        long timeInSecs = TimeNow.getTimeInMillis();

        try {
            token = JWT.create().withIssuer(Config.Issuer).withPayload(payload)
                    .withExpiresAt(new Date(timeInSecs + Config.ExpireTime)).sign(Config.algorithm);
        } catch (JWTCreationException exception) {
            // Add error handling
            exception.printStackTrace();
        }

        return token;

    }

    public static boolean verifyToken(String token) {

        try {
            JWTVerifier verifier = JWT.require(Config.algorithm).withIssuer(Config.Issuer).build(); // Reusable verifier
            DecodedJWT verifiedJWT = verifier.verify(token);
        } catch (JWTVerificationException exception) {
            System.out.println("Token verification failed");
            return false;
        }

        System.out.println("Token verified");
        return true;

    }

    public DecodedJWT decodeJWT(String token) {
        DecodedJWT decoded = null;
        try {
            decoded = JWT.decode(token);
        } catch (JWTDecodeException exception) {
            // Handle invalid token
            exception.printStackTrace();
        }
        return decoded;
    }
}