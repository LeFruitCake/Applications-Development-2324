package com.StartupManagementSystem.AppDevFinalProject.api.Services;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.User;
import com.StartupManagementSystem.AppDevFinalProject.api.Repositories.UserRepository;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.EditUserRequest;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public Boolean registerUser(RegisterRequest registerRequest){
        Optional<User> checkDuplicate = userRepository.findByUsername(registerRequest.getUsername());
        if(checkDuplicate.isPresent()){
            return Boolean.FALSE;
        }
        User registerUser = new User();
        registerUser.setUsername(registerRequest.getUsername());
        registerUser.setPassword(registerRequest.getPassword());
        registerUser.setFirstname(registerRequest.getFirstname());
        registerUser.setLastname(registerRequest.getLastname());
        registerUser.setAccessType("Guest");
        User savedUser = userRepository.save(registerUser);

        return Boolean.TRUE;
    }

    public Optional<User> loginUser(String username, String password){
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            if (user.get().getPassword().equals(password)){
                return user;
            }
        }
        return Optional.empty();
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }

    public List<User> findAll(){
        return userRepository.findUsersByNotHeadAdmin();
    }

    public Boolean saveUserChanges(EditUserRequest editUserRequest){
        User user = userRepository.getReferenceById(editUserRequest.getUserID());
        System.out.println("And ID: "+editUserRequest.getUserID());
        System.out.println(editUserRequest.getAccessType());
        System.out.println(editUserRequest.getCompanyID());
        if (!editUserRequest.getAccessType().equals("Employee")){
            user.setAccessType(editUserRequest.getAccessType());
            userRepository.save(user);
            return Boolean.TRUE;
        }else{
            user.setAccessType(editUserRequest.getAccessType());
            user.setCompanyID(editUserRequest.getCompanyID());
            userRepository.save(user);
            return Boolean.TRUE;
        }
    }
}
