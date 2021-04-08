package no.hvl.dat109.service;

import no.hvl.dat109.entity.Order;
import no.hvl.dat109.entity.User;
import no.hvl.dat109.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean userExists(long id) {
        return userRepository.findById(id).isPresent();
    }

    public Set<Order> findOrdersforUser(long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(User::getUserOrders).orElse(null);
    }

}
