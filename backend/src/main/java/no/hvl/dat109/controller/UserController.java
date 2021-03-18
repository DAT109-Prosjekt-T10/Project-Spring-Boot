package no.hvl.dat109.controller;

import no.hvl.dat109.entity.User;
import no.hvl.dat109.repository.UserRepository;
import no.hvl.dat109.util.JWTUtil;
import no.hvl.dat109.util.PasswordUtil;
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
    public ResponseEntity<User> registerUser(@RequestBody User user) {

        // Check if email already exists
        User userWithEmail = userRepository.findByEmail(user.getEmail());
        if (userWithEmail != null) {
            System.out.println(userWithEmail.toString());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        String passwordHash = PasswordUtil.hashPassword(user.getPassword());

        User newUser = new User(user.getName(), user.getEmail(), passwordHash, user.isAdmin());
        User savedUser = userRepository.save(newUser);

        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> authorizeUser(@RequestBody User user) {
        User registeredUser = userRepository.findByEmail(user.getEmail());

        // Check if user exists
        if (registeredUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        boolean correctPassword = PasswordUtil.comparePassword(user.getPassword(), registeredUser.getPassword());

        if (!correctPassword) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

//        String jwtToken = JWTUtil.createToken(user.getId().toString());
//        return ResponseEntity.ok(jwtToken);

        // Skjuler passord i JSON-response
        registeredUser.setPassword(null);

        return ResponseEntity.ok(registeredUser);

    }

}
