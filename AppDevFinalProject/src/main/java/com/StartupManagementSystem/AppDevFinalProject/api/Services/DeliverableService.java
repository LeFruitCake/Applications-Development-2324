package com.StartupManagementSystem.AppDevFinalProject.api.Services;


import com.StartupManagementSystem.AppDevFinalProject.api.Models.Deliverable;
import com.StartupManagementSystem.AppDevFinalProject.api.Repositories.DeliverableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliverableService {

    @Autowired
    private DeliverableRepository deliverableRepository;

    public List<Deliverable> getAllByTaskID(Long id){
        return deliverableRepository.findAllByTaskID(id);
    }
}
