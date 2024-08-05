package com.StartupManagementSystem.AppDevFinalProject.api.Controllers;


import com.StartupManagementSystem.AppDevFinalProject.api.Requests.RegisterRequest;
import com.StartupManagementSystem.AppDevFinalProject.api.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest){
        Boolean registrationFlag = userService.registerUser(registerRequest);
        if (registrationFlag){
            return ResponseEntity.ok("Registration Successful.");
        }
        return ResponseEntity.unprocessableEntity().build();
    }
}
