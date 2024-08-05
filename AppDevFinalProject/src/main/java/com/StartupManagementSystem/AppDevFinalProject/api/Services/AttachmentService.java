package com.StartupManagementSystem.AppDevFinalProject.api.Services;


import com.StartupManagementSystem.AppDevFinalProject.api.Models.Attachment;
import com.StartupManagementSystem.AppDevFinalProject.api.Repositories.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttachmentService {

    @Autowired
    private AttachmentRepository attachmentRepository;

    public List<Attachment> findAllByTaskID(Long id){
        return attachmentRepository.findAllByTaskID(id);
    }
}
