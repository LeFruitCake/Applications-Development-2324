package com.StartupManagementSystem.AppDevFinalProject.api.Services;


import com.StartupManagementSystem.AppDevFinalProject.api.Miscellaneous.FileNameGenerator;
import com.StartupManagementSystem.AppDevFinalProject.api.Models.*;
import com.StartupManagementSystem.AppDevFinalProject.api.Repositories.*;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.CreateTaskRequest;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.EditTaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private DeliverableRepository deliverableRepository;

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    private String file_path = "C:/Users/USER/OneDrive - Cebu Institute of Technology University/Documents/CIT-U Files/Applications Development/fullstack clone/Frontend/smsfrontend/public/";
    private FileNameGenerator fileNameGenerator = new FileNameGenerator();

    public Boolean createTask(CreateTaskRequest createTaskRequest){
        Task task = new Task();
        task.setTitle(createTaskRequest.getTitle());
        task.setInstructions(createTaskRequest.getInstructions());
        task.setDue(createTaskRequest.getDue());
        task.setCompanyID(createTaskRequest.getCompanyID());
        task.setProgress(0);
        Task saved_task = taskRepository.save(task);
        for (String deliverable: createTaskRequest.getDeliverables()){
            Deliverable deliverable1 = new Deliverable(saved_task.getId(),deliverable);
            deliverableRepository.save(deliverable1);
        }
        if (!createTaskRequest.getAttachments().isEmpty()){
            for(MultipartFile attachment: createTaskRequest.getAttachments()){
                if (!attachment.getOriginalFilename().equals("")){
                    String attachmentPath = fileNameGenerator.generate(attachment.getOriginalFilename());

                    File file = new File(file_path+attachmentPath);
                    try {
                        attachment.transferTo(file);
                        Attachment attachment1 = new Attachment(saved_task.getId(), attachmentPath,attachment.getOriginalFilename());
                        System.out.println("Attachment ID: " + attachment1.getTaskID());
                        System.out.println("File Path: " + attachment1.getFilePath());
                        attachmentRepository.save(attachment1);
                        System.out.println("File transferred successfully: " + file.getAbsolutePath());
                    } catch (IOException e) {
                        System.out.println("Error transferring file: " + e.getMessage());
                        throw new RuntimeException(e);
                    }
                }

            }
        }
        User user = userRepository.getReferenceById(createTaskRequest.getUserID());
        Notification notification = new Notification(1, user.getUsername(), user.getProfilePhoto(), createTaskRequest.getCompanyID(), saved_task.getId(), saved_task.getTitle(), new Date());
        notificationRepository.save(notification);
        return Boolean.TRUE;
    }

    public Boolean deleteTask(Long id){
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()){
            List<Attachment> attachments = attachmentRepository.findAllByTaskID(task.get().getId());
            List<Deliverable> deliverables = deliverableRepository.findAllByTaskID(task.get().getId());
            if (attachments != null){
                for (Attachment attachment : attachments){
                    File file = new File(file_path+attachment.getFilePath());
                    if (file.exists()){
                        file.delete();
                    }
                    attachmentRepository.delete(attachment);
                }
            }
            if (deliverables != null){
                for (Deliverable deliverable:deliverables){
                    List<Submission> submissions = submissionRepository.getAllSubmissionsByDeliverableID(deliverable.getId());
                    if (!submissions.isEmpty()){
                        for (Submission submission:submissions){
                            File file = new File(file_path+submission.getFilePath());
                            if (file.exists()){
                                file.delete();
                            }
                            submissionRepository.delete(submission);
                        }
                    }
                    deliverableRepository.delete(deliverable);
                }
            }
            taskRepository.delete(task.get());

            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Boolean editTask(EditTaskRequest editTaskRequest){
        Optional<Task> edit_task = taskRepository.findById(editTaskRequest.getId());
        if (edit_task.isPresent()){
            Task foo = edit_task.get();
            foo.setTitle(editTaskRequest.getTitle());
            foo.setInstructions(editTaskRequest.getInstructions());
            foo.setDue(editTaskRequest.getDue());
            taskRepository.save(foo);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Optional<Task> getTaskByID(Long id){
        return taskRepository.findById(id);
    }

    public List<Task> getAllTaskByCompanyID(Long id){
        return taskRepository.findAllByCompanyID(id);
    }
}
