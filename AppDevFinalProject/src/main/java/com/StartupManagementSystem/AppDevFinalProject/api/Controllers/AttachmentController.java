package com.StartupManagementSystem.AppDevFinalProject.api.Controllers;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.Attachment;
import com.StartupManagementSystem.AppDevFinalProject.api.Services.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Attachments")
@CrossOrigin(origins = "http://localhost:3000")
public class AttachmentController {

    @Autowired
    private AttachmentService attachmentService;


    @GetMapping("/getAllByTaskID")
    public ResponseEntity<List<Attachment>> findAllByTaskID(@RequestParam Long id){
        return ResponseEntity.ok(attachmentService.findAllByTaskID(id));
    }
}
