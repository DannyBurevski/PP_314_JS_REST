package com.example.pp_314_js_rest.controller;

import com.example.pp_314_js_rest.model.User;
import com.example.pp_314_js_rest.service.RoleService;
import com.example.pp_314_js_rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminsController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminsController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String index(Principal principal, Model model) {
        User user_admin = userService.findByUsername(principal.getName());
        model.addAttribute("user_admin", user_admin);
        model.addAttribute("rolesList", roleService.findAll());
        return "admin";
    }
}

