package com.StartupManagementSystem.AppDevFinalProject.api.Services;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.Notification;
import com.StartupManagementSystem.AppDevFinalProject.api.Repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(Notification notification){
        notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsForCompany(Long companyID){
        return notificationRepository.findNotificationsByActivityForEmployee(companyID);
    }

    public List<Notification> getNotificationsForAdmin(){
        return notificationRepository.findNotificationsByActivityForAdmin();
    }
}
