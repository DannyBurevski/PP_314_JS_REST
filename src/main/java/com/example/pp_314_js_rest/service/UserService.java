package com.example.pp_314_js_rest.service;


import com.example.pp_314_js_rest.model.User;

import java.util.List;

public interface UserService {
    List<User> findAll();
    User findById(Long id);
    User findByUsername(String username);
    void saveUser(User user);
    void deleteById(Long id);
    void update(User user);
}
