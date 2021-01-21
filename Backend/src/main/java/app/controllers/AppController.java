package app.controllers;

import app.model.User;
import app.responses.BaseResponse;
import app.user_service.*;
import app.requests.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/")
@EnableWebSecurity
public class AppController {

    private int counter = 0;

    private final UserService userService;

    public AppController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public RedirectView redirectToIndex() {
        return new RedirectView("/index.html");
    }


    @GetMapping("/user/{login}")
    ResponseEntity<String[]> getUserRoles(@PathVariable String login) {
        User user = userService.getUser(login);
        String[] roles = user.getRoles();
        if (roles != null) {
            return ResponseEntity.ok().body(roles);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/register")
    public BaseResponse addUser(@RequestBody UserAddRequest userAddRequest){
        boolean isOk = userService.addUser(userAddRequest.createUser());
        return new BaseResponse(isOk?200:400, isOk);
    }

    @PostMapping("/ok")
    public BaseResponse ok(){
        return new BaseResponse(200,"ok");
    }
    @PostMapping("/err")
    public BaseResponse err(){
        return new BaseResponse(400,"error");
    }
}
