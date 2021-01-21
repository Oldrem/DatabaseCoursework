package app.controllers;

import app.responses.BaseResponse;
import app.user_service.*;
import app.requests.*;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;


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
