package com.StartupManagementSystem.AppDevFinalProject.api.Controllers;


import com.StartupManagementSystem.AppDevFinalProject.api.Models.User;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.LoginRequest;
import com.StartupManagementSystem.AppDevFinalProject.api.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<Optional<User>> loginUser(@RequestBody LoginRequest loginRequest){
        Optional<User> user = userService.loginUser(loginRequest.getUsername(),loginRequest.getPassword());
        if(user.isPresent()){
            user.get().setPassword("");
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }


}
