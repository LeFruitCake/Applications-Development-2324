package com.StartupManagementSystem.AppDevFinalProject.api.Repositories;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {

    public List<Attachment> findAllByTaskID(Long taskID);
}
