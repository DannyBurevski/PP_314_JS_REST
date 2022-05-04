package com.example.pp_314_js_rest.service;


import com.example.pp_314_js_rest.model.Role;

import java.util.List;

public interface RoleService {
    List<Role> findAll();
    List<Role> findByName(List<String> name);
    void saveRole(Role role);
}