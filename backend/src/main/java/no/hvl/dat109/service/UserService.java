package no.hvl.dat109.service;

import no.hvl.dat109.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean userExists(long id) {
        return userRepository.findById(id).isPresent();
    }

}
