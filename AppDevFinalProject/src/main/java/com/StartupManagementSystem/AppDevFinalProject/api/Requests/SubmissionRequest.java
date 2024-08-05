package com.StartupManagementSystem.AppDevFinalProject.api.Requests;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class SubmissionRequest {
    private List<MultipartFile> files;
    private Long deliverableID;
    private Long userID;

    public SubmissionRequest() {
    }

    public SubmissionRequest(List<MultipartFile> files, Long deliverableID, Long userID) {
        this.files = files;
        this.deliverableID = deliverableID;
        this.userID = userID;
    }

    public List<MultipartFile> getFiles() {
        return files;
    }

    public void setFiles(List<MultipartFile> files) {
        this.files = files;
    }

    public Long getDeliverableID() {
        return deliverableID;
    }

    public void setDeliverableID(Long deliverableID) {
        this.deliverableID = deliverableID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
}
