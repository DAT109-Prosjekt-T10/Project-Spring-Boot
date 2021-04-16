package no.hvl.dat109.service;

import no.hvl.dat109.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public void removeOrder(long id) {
        orderRepository.deleteById(id);
    }

}
