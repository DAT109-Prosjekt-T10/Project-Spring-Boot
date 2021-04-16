package no.hvl.dat109.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {

    @GetMapping("")
    public ResponseEntity<Object> sayHi() {
        return ResponseEntity.ok("Hello World");
    }

    @PostMapping("")
    public ResponseEntity<Object> sayHiToo() {
        return ResponseEntity.ok("Hello World");
    }

}
