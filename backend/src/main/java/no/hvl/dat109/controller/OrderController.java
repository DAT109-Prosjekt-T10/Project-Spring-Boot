package no.hvl.dat109.controller;

import no.hvl.dat109.entity.Book;
import no.hvl.dat109.entity.Order;
import no.hvl.dat109.repository.OrderRepository;
import no.hvl.dat109.service.BookService;
import no.hvl.dat109.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private BookService bookService;
    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);

        return optionalOrder.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).build());

    }

    @PostMapping("")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {

        boolean bookExists = bookService.bookExists(order.getBook().getId());
        boolean userExists = userService.userExists(order.getUser().getId());

        if (bookExists && userExists) {

            if (bookService.bookIsAvailable(order.getBook().getId(), order.getDateFrom(), order.getDateTo())) {
                Order savedOrder = orderRepository.save(order);
                return ResponseEntity.ok(savedOrder);
            } else {
                // TODO Create APIError class for error message! https://www.baeldung.com/global-error-handler-in-a-spring-rest-api
                return ResponseEntity.status(400).build();
            }

        }

        // TODO Create APIError class for error message!
        return ResponseEntity.status(400).build();

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteOrder(@PathVariable("id") long id) {
        try {
            orderRepository.deleteById(id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            return ResponseEntity.status(404).build();
        }
    }

}
