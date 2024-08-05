package com.StartupManagementSystem.AppDevFinalProject.api.Controllers;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.Notification;
import com.StartupManagementSystem.AppDevFinalProject.api.Services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/employee")
    public ResponseEntity<List<Notification>> getNotificationForEmployee(@RequestParam Long companyID){
        return ResponseEntity.ok(notificationService.getNotificationsForCompany(companyID));
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Notification>> getNotificationForAdmin(){
        return ResponseEntity.ok(notificationService.getNotificationsForAdmin());
    }
}
