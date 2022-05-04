package com.example.pp_314_js_rest.dao;

import com.example.pp_314_js_rest.model.Role;

import java.util.List;

public interface RoleDao {
    List<Role> findAll();
    List<Role> findByName(List<String> name);
    void saveRole(Role role);
}
