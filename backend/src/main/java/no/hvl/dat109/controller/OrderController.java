package no.hvl.dat109.controller;

import no.hvl.dat109.entity.Order;
import no.hvl.dat109.repository.OrderRepository;
import no.hvl.dat109.service.BookService;
import no.hvl.dat109.service.UserService;
import no.hvl.dat109.util.ApiError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

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
    public ResponseEntity<Object> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOrderById(@PathVariable("id") long id) {
        Optional<Object> optionalOrder = Optional.of(orderRepository.findById(id));

        return optionalOrder.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(new ApiError("Order does not exist on server.")));

    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Object> getOrdersForUser(@PathVariable("id") long id) {
        Set<Order> orders = userService.findOrdersforUser(id);
        if (!orders.isEmpty()) {
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.status(404).body(new ApiError("User " + id + " has no orders."));
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> createOrder(@RequestBody Order order) {

        boolean bookExists = bookService.bookExists(order.getBook().getId());
        boolean userExists = userService.userExists(order.getUser().getId());

        if (bookExists && userExists) {

            if (bookService.bookIsAvailable(order.getBook().getId(), order.getDateFrom(), order.getDateTo())) {
                Order savedOrder = orderRepository.save(order);
                return ResponseEntity.ok(savedOrder);
            } else {
                return ResponseEntity.status(400).body(new ApiError("Book is not available at given dates."));
            }

        }

        return ResponseEntity.status(400).body(new ApiError(("Book and/or user does not exist on server.")));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteOrder(@PathVariable("id") long id) {
        try {
            orderRepository.deleteById(id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ApiError("Order does not exist on server."));
        }
    }

}
