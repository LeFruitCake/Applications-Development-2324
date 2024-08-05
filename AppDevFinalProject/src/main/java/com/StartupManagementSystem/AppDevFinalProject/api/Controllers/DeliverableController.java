package com.StartupManagementSystem.AppDevFinalProject.api.Controllers;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.Deliverable;
import com.StartupManagementSystem.AppDevFinalProject.api.Services.DeliverableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Deliverables")
@CrossOrigin(origins = "http://localhost:3000")
public class DeliverableController {

    @Autowired
    private DeliverableService deliverableService;

    @GetMapping("/getAllByTaskID")
    public ResponseEntity<List<Deliverable>> getAllByTaskID(@RequestParam Long id){
        return ResponseEntity.ok(deliverableService.getAllByTaskID(id));
    }
}
