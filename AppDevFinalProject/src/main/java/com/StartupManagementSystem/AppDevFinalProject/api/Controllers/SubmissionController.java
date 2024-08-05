package com.StartupManagementSystem.AppDevFinalProject.api.Controllers;


import com.StartupManagementSystem.AppDevFinalProject.api.Models.Submission;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.SubmissionRequest;
import com.StartupManagementSystem.AppDevFinalProject.api.Services.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/submission")
@CrossOrigin(origins = "http://localhost:3000")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @PostMapping("/add")
    public ResponseEntity<String> addSubmission(@ModelAttribute SubmissionRequest submissionRequest){
        if (submissionService.addSubmission(submissionRequest)){
            return ResponseEntity.ok("Submitted.");
        }
        return ResponseEntity.unprocessableEntity().build();
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeSubmission(@RequestParam Long id){
        if (submissionService.removeSubmission(id)){
            return ResponseEntity.ok("Submission Removed.");
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/GetAllByDeliverableID")
    public ResponseEntity<List<Submission>> getAllSubmissionsByTaskID(@RequestParam Long id){
        return ResponseEntity.ok(submissionService.getAllByDeliverableID(id));
    }

    @PostMapping("/accept")
    public ResponseEntity<Boolean> acceptSubmission(@RequestParam Long deliverableID, @RequestParam Long userID){
        return ResponseEntity.ok(submissionService.acceptSubmission(deliverableID,userID));
    }

    @PostMapping("/reject")
    public ResponseEntity<Boolean> rejectSubmission(@RequestParam Long deliverableID, @RequestParam Long userID){
        return ResponseEntity.ok(submissionService.rejectSubmission(deliverableID, userID));
    }
}
