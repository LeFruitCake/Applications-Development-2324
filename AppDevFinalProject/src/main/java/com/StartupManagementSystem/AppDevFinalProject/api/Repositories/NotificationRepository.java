package com.StartupManagementSystem.AppDevFinalProject.api.Repositories;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("SELECT n FROM Notification n WHERE n.activity IN (1, 2, 3) AND n.companyID = :companyID")
    List<Notification> findNotificationsByActivityForEmployee(Long companyID);

    @Query("SELECT n FROM Notification n WHERE n.activity IN (4, 5)")
    List<Notification> findNotificationsByActivityForAdmin();
}
