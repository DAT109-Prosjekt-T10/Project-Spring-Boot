package no.hvl.dat109.controller;

import no.hvl.dat109.entity.User;
import no.hvl.dat109.repository.UserRepository;
import no.hvl.dat109.util.ApiError;
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

    /**
     * Method to register a new user.
     * 
     * @param user
     * @return ResponseEntity<String>
     */
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody User user) {

        if (user.getEmail() == null || user.getPassword() == null || user.getName() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError("One or more user-attribute is null"));
        }

        if (!(EmailValidator.getInstance().isValid(user.getEmail()) && (user.getPassword().length() >= 8)
                && user.getName().length() > 0)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError("Email/password/name format is invalid."));
        }

        // Check if email already exists
        User userWithEmail = userRepository.findByEmail(user.getEmail());
        if (userWithEmail != null) {
            System.out.println(userWithEmail.toString());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiError("User with email already exists."));
        }

        String passwordHash = PasswordUtil.hashPassword(user.getPassword());

        User newUser = new User(user.getName(), user.getEmail(), passwordHash, user.isAdmin());
        User savedUser = userRepository.save(newUser);

        String token = JWTUtil.createToken(savedUser.getName(), savedUser.getId(), savedUser.isAdmin());

        return ResponseEntity.ok(token);
    }

    /**
     * Method to authorize a User.
     * 
     * @param user
     * @return ResponseEntity<String>
     */
    @PostMapping("/login")
    public ResponseEntity<Object> authorizeUser(@RequestBody User user) {

        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError("Email and/or password are null."));
        }

        if (!(EmailValidator.getInstance().isValid(user.getEmail()) && (user.getPassword().length() >= 8))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email format is invalid and/or password is too short.");
        }

        User registeredUser = userRepository.findByEmail(user.getEmail());

        // Check if user exists
        if (registeredUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User with email does not exist.");
        }

        boolean correctPassword = PasswordUtil.comparePassword(user.getPassword(), registeredUser.getPassword());

        if (!correctPassword) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiError("Invalid login credentials"));
        }

        String token = JWTUtil.createToken(registeredUser.getName(), registeredUser.getId(), registeredUser.isAdmin());
        return ResponseEntity.ok(token);

    }

}
