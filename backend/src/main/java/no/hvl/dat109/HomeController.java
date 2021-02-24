package no.hvl.dat109;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HomeController {

    @GetMapping("/")
    public String Landing() {
        String message = "This message is brought to you by Spring Boot, Java, blood, sweat and tears. Welcome to the landing page";
        return message;
    }

    @GetMapping("/home")
    public String home() {
        String message = "This message is brought to you by Spring Boot, Java, blood, sweat and tears.";
        return message;
    }

    @GetMapping("/home2")
    public String home2() {
        String message = "Alternate message";
        return message;
    }

    @GetMapping("/test")
    public String hello(Model model,
            @RequestParam(value = "name", required = false, defaultValue = "World") String name) {
        model.addAttribute("name", name);
        return "hello";
    }

}
