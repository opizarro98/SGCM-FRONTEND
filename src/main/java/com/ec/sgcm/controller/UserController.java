package com.ec.sgcm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.model.User;
import com.ec.sgcm.services.UserService;

@RestController
@RequestMapping("/userRest")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createNewUser")
    public ResponseEntity<User> createNewUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createNewUser(user));
    }

    @GetMapping("/findUserByUsername/{username}")
    public ResponseEntity<User> findUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.findUserByUsername(username));
    }
}
