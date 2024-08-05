package com.StartupManagementSystem.AppDevFinalProject.api.Repositories;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    public List<Submission> getAllSubmissionsByDeliverableID(Long deliverableid);
}
