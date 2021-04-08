package no.hvl.dat109.controller;

import no.hvl.dat109.entity.User;
import no.hvl.dat109.repository.UserRepository;
import no.hvl.dat109.util.JWTUtil;
import no.hvl.dat109.util.PasswordUtil;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody User user) {

        if (user.getEmail() == null || user.getPassword() == null || user.getName() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (!(EmailValidator.getInstance().isValid(user.getEmail()) && (user.getPassword().length() >= 8)
                && user.getName().length() > 0)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // Check if email already exists
        User userWithEmail = userRepository.findByEmail(user.getEmail());
        if (userWithEmail != null) {
            System.out.println(userWithEmail.toString());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        String passwordHash = PasswordUtil.hashPassword(user.getPassword());

        User newUser = new User(user.getName(), user.getEmail(), passwordHash, user.isAdmin());
        User savedUser = userRepository.save(newUser);

        // Skjuler passord i JSON-response
        savedUser.setPassword(null);

        String token = JWTUtil.createToken(savedUser.getName(), savedUser.getId(), savedUser.isAdmin());

        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> authorizeUser(@RequestBody User user) {

        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (!(EmailValidator.getInstance().isValid(user.getEmail()) && (user.getPassword().length() >= 8))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        User registeredUser = userRepository.findByEmail(user.getEmail());

        // Check if user exists
        if (registeredUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean correctPassword = PasswordUtil.comparePassword(user.getPassword(), registeredUser.getPassword());

        if (!correctPassword) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = JWTUtil.createToken(registeredUser.getName(), registeredUser.getId(), registeredUser.isAdmin());
        return ResponseEntity.ok(token);

    }

}
