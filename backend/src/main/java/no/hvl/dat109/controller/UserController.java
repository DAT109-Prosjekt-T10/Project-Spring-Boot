package no.hvl.dat109.controller;

import no.hvl.dat109.entity.User;
import no.hvl.dat109.repository.UserRepository;
import no.hvl.dat109.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/")
    public User registerUser(WebRequest req) {

        String email = req.getParameter("email");
        String name = req.getParameter("name");

        String password = req.getParameter("password");
        String hash = PasswordUtil.hashPassword(password);

        User newUser = new User(email, name, hash);
        userRepository.save(newUser);

        return newUser;
    }

}
