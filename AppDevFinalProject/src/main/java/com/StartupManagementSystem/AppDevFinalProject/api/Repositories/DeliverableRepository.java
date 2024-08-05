package com.StartupManagementSystem.AppDevFinalProject.api.Repositories;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.Deliverable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliverableRepository extends JpaRepository<Deliverable, Long> {

    public List<Deliverable> findAllByTaskID(Long taskID);
}
