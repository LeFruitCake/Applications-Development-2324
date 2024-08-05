package com.StartupManagementSystem.AppDevFinalProject.api.Controllers;


import com.StartupManagementSystem.AppDevFinalProject.api.Models.User;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.EditUserRequest;
import com.StartupManagementSystem.AppDevFinalProject.api.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/User")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getUser")
    public ResponseEntity<User> findUserByID(@RequestParam Long id){
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()){
            User foo = user.get();
            foo.setPassword("");
            return ResponseEntity.ok(foo);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<User>> findAll(){
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/save")
    public ResponseEntity<Boolean> saveChanges(@RequestBody EditUserRequest editUserRequest){
        return ResponseEntity.ok(userService.saveUserChanges(editUserRequest));
    }
}
