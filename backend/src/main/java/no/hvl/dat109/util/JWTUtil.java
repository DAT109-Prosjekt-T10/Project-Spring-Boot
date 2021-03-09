package no.hvl.dat109.util;

public class JWTUtil {


    public string createToken() {
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret"); //Change secret and move to variables file
            String token = JWT.create()
                .withIssuer("Gruppe-10")
                .sign(algorithm);
        } catch (JWTCreationException exception){
            //Add error handling
        }

        return token;
        
    }


    public verifyToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret"); //Change secret and move to variables file
            JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("Gruppe-10")
                .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(token);

            
        } catch (JWTVerificationException exception){
            // Handle invalid signature
        }

        //Continue if valid

    }
}