package com.example.pp_314_js_rest.controller;

import com.example.pp_314_js_rest.model.User;
import com.example.pp_314_js_rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UsersController {

    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String show(Principal principal, Model model) {
        User user = userService.findByUsername(principal.getName());
        model.addAttribute("user_admin", user);
        return "user";
    }

}
