package com.ec.sgcm.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.User;
import com.ec.sgcm.repository.UserRepo;
import com.ec.sgcm.services.UserService;

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
    public User findUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }
}
