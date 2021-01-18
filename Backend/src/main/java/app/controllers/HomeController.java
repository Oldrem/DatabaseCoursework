package app.controllers;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/")
@EnableWebSecurity
public class HomeController {
    @GetMapping
    public RedirectView redirectToIndex() {
        return new RedirectView("/index.html");
    }
}
