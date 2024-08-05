package com.StartupManagementSystem.AppDevFinalProject.api.Controllers;


import com.StartupManagementSystem.AppDevFinalProject.api.Models.Task;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.CreateTaskRequest;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.EditTaskRequest;
import com.StartupManagementSystem.AppDevFinalProject.api.Services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/StartupProfile")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/createTask")
    public ResponseEntity<String> createTask(@ModelAttribute  CreateTaskRequest createTaskRequest){
        if (taskService.createTask(createTaskRequest)){
            return ResponseEntity.ok("Task created successfully.");
        }
        return ResponseEntity.unprocessableEntity().build();
    }

    @PostMapping("/deleteTask")
    public ResponseEntity<String> deleteTask(@RequestParam Long id){
        if (taskService.deleteTask(id)){
            return ResponseEntity.ok("Task deleted successfully.");
        }
        return ResponseEntity.unprocessableEntity().build();
    }

    @PostMapping("/editTask")
    public ResponseEntity<String> editTask(@ModelAttribute EditTaskRequest editTaskRequest){
        if (taskService.editTask(editTaskRequest)){
            return ResponseEntity.ok("Changes saved.");
        }

        return ResponseEntity.unprocessableEntity().build();
    }


    @GetMapping("/getTask")
    public ResponseEntity<Task> getTask(@RequestParam Long id){
        Optional<Task> task = taskService.getTaskByID(id);
        if (task.isPresent()){
            return ResponseEntity.ok(task.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/AllTasksByCompany")
    public ResponseEntity<List<Task>> getAllTaskByCompanyID(@RequestParam Long id){
        List<Task> tasks = taskService.getAllTaskByCompanyID(id);
        if (tasks != null){
            return ResponseEntity.ok(tasks);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
