package no.hvl.dat109.util;

import java.util.HashMap;
import java.util.Map;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

public class JWTUtil {

    public String createToken(String id) {
    	
    	String token = null;
    	Map<String, Object> payloadClaims = new HashMap<>();
    	payloadClaims.put("id", id);
    	
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret"); //Change secret and move to variables file
            token = JWT.create()
                .withIssuer("Gruppe-10")
                .withPayload(payloadClaims)
                .sign(algorithm);
        } catch (JWTCreationException exception){
            //Add error handling
        	exception.printStackTrace();
        }
        
        return token;
    
    }
    
    public boolean verifyToken(String token){
        
    	try {
            Algorithm algorithm = Algorithm.HMAC256("secret"); //Change secret and move to variables file
            JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("Gruppe-10")
                .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(token);
            
        } catch (JWTVerificationException exception){
            // Handle invalid signature
        	return false;
        }

        //Continue if valid
        return true;
    
    }
}