package com.ec.sgcm.services;

import com.ec.sgcm.model.User;

public interface UserService {

    public User createNewUser(User user);

    public User findUserByUsername(String username, String password);

}
