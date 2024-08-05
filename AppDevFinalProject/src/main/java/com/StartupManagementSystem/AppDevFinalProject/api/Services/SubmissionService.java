package com.StartupManagementSystem.AppDevFinalProject.api.Services;


import com.StartupManagementSystem.AppDevFinalProject.api.Miscellaneous.FileNameGenerator;
import com.StartupManagementSystem.AppDevFinalProject.api.Models.*;
import com.StartupManagementSystem.AppDevFinalProject.api.Repositories.*;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.SubmissionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private DeliverableRepository deliverableRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private CompanyRepository companyRepository;
    private FileNameGenerator fileNameGenerator = new FileNameGenerator();

    public Boolean addSubmission(SubmissionRequest submissionRequest){
        if (submissionRequest.getFiles() != null){
            for (MultipartFile submission: submissionRequest.getFiles()){
                String file_path = "C:/Users/USER/OneDrive - Cebu Institute of Technology University/Documents/CIT-U Files/Applications Development/fullstack clone/Frontend/smsfrontend/public/";
                String unique_filepath = fileNameGenerator.generate(submission.getOriginalFilename());
                File file = new File(file_path+unique_filepath);
                try {
                    submission.transferTo(file);
                    System.out.println("File transferred successfully: " + file.getAbsolutePath());
                } catch (IOException e) {
                    System.out.println("Error transferring file: " + e.getMessage());
                    throw new RuntimeException(e);
                }
                Submission submission1 = new Submission(submissionRequest.getDeliverableID(),unique_filepath, submission.getOriginalFilename());
                submissionRepository.save(submission1);
            }
            Optional<Deliverable> deliverable = deliverableRepository.findById(submissionRequest.getDeliverableID());
            if(deliverable.isPresent()){
                Deliverable foo = deliverable.get();
                foo.setHas_submission(Boolean.TRUE);
                deliverableRepository.save(foo);
            }
            Task task = taskRepository.getReferenceById(deliverable.get().getTaskID());
            User user = userRepository.getReferenceById(submissionRequest.getUserID());
            Notification notification = new Notification(4,user.getUsername(),user.getProfilePhoto(),task.getCompanyID(),task.getId(),task.getTitle(),new Date());
            notificationRepository.save(notification);
            return Boolean.TRUE;
        } else if (submissionRequest.getFiles() == null) {
            List<Submission> submissions = submissionRepository.getAllSubmissionsByDeliverableID(submissionRequest.getDeliverableID());
            if (!submissions.isEmpty()){
                Deliverable deliverable = deliverableRepository.getReferenceById(submissionRequest.getDeliverableID());
                deliverable.setHas_submission(Boolean.TRUE);
                deliverableRepository.save(deliverable);
            }
            Deliverable deliverable = deliverableRepository.getReferenceById(submissionRequest.getDeliverableID());
            Task task = taskRepository.getReferenceById(deliverable.getTaskID());
            User user = userRepository.getReferenceById(submissionRequest.getUserID());
            Notification notification = new Notification(4,user.getUsername(),user.getProfilePhoto(),task.getCompanyID(),task.getId(),task.getTitle(),new Date());
            notificationRepository.save(notification);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Boolean deleteSubmission(Long id){
        submissionRepository.delete(submissionRepository.findById(id).get());
        return Boolean.TRUE;
    }

    public Boolean removeSubmission(Long id){
        Optional<Deliverable> deliverable = deliverableRepository.findById(id);
        if (deliverable.isPresent()){
            Deliverable foo = deliverable.get();
            foo.setHas_submission(Boolean.FALSE);
            deliverableRepository.save(foo);
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    public Submission getSubmissionByID(Long id){
        return submissionRepository.findById(id).get();
    }

    public List<Submission> getAllByDeliverableID(Long id){
        return submissionRepository.getAllSubmissionsByDeliverableID(id);
    }

    public Boolean acceptSubmission(Long deliverableID, Long userID){
        Deliverable deliverable = deliverableRepository.getReferenceById(deliverableID);
        deliverable.setIs_approved(Boolean.TRUE);
        deliverableRepository.save(deliverable);
        Task task = taskRepository.getReferenceById(deliverable.getTaskID());
        int completed_tasks = (int) deliverableRepository.findAllByTaskID(task.getId()).stream().filter(Deliverable::getIs_approved).count();
        int total_tasks = (int) deliverableRepository.findAllByTaskID(task.getId()).size();
        System.out.println("completed Tasks: "+completed_tasks);
        System.out.println("total Tasks: "+total_tasks);
        task.setProgress((int) Math.ceil(((double) (completed_tasks) /total_tasks)*100));
        taskRepository.save(task);
        User user = userRepository.getReferenceById(userID);
        Notification notification = new Notification(2,user.getUsername(),user.getProfilePhoto(),task.getCompanyID(),task.getId(),task.getTitle(),new Date());
        notificationRepository.save(notification);
        if (task.getProgress()==100){
            Company company = companyRepository.getReferenceById(task.getCompanyID());
            Notification notification1 = new Notification();
            notification1.setActivity(5);
            notification1.setUsername(company.getName());
            notification1.setTaskName(task.getTitle());
            notification1.setDate(new Date());
            notificationRepository.save(notification1);
        }
        return Boolean.TRUE;
    }

    public Boolean rejectSubmission(Long id, Long userID){
        Deliverable deliverable = deliverableRepository.getReferenceById(id);
        deliverable.setHas_submission(Boolean.FALSE);
        deliverableRepository.save(deliverable);
        Task task = taskRepository.getReferenceById(deliverable.getTaskID());
        User user = userRepository.getReferenceById(userID);
        Notification notification = new Notification(3,user.getUsername(),user.getProfilePhoto(),task.getCompanyID(),task.getId(),task.getTitle(),new Date());
        notificationRepository.save(notification);
        return Boolean.TRUE;
    }
}
