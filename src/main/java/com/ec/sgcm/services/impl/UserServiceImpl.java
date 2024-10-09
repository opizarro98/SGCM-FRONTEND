package com.ec.sgcm.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.User;
import com.ec.sgcm.repository.UserRepo;
import com.ec.sgcm.services.UserService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public User createNewUser(User user) {
        // El password se encripta automáticamente en el setter
        return userRepo.save(user);
    }

    @Override
    public User findUserByUsername(String username, String password) {
        User usertoLogin = userRepo.findByUsername(username);
        if (usertoLogin != null) {
            if (usertoLogin.getPassword().equals(password)) {
                return usertoLogin;
            }
            throw new EntityNotFoundException("Invalid password");
        }
        throw new EntityNotFoundException("ivalid user and pasword");
    }
}
