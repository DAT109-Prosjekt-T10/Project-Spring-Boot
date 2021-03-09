package no.hvl.dat109.util;

import java.util.HashMap;
import java.util.Map;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

public class JWTUtil {

    public String createToken(String id) {

        String token = null;
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", id);

        try {
            token = JWT.create().withIssuer(Config.Issuer).withPayload(payload).sign(Config.algorithm);
        } catch (JWTCreationException exception) {
            // Add error handling
            exception.printStackTrace();
        }

        return token;

    }

    public boolean verifyToken(String token) {

        try {
            JWTVerifier verifier = JWT.require(Config.algorithm).withIssuer(Config.Issuer).build(); // Reusable verifier
            DecodedJWT decodedJWT = verifier.verify(token);

        } catch (JWTVerificationException exception) {
            // Handle invalid signature
            return false;
        }

        // Continue if valid
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