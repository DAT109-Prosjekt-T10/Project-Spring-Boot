package no.hvl.dat109.util;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class PasswordUtil {

    public String hashPassword(String plaintext) {

        String hashed = BCrypt.hashpw(plaintext, Config.Salt);

        return hashed;
    }

    public boolean comparePassword(String plain, String hashed) {
        return BCrypt.checkpw(plain, hashed);
    }
}
