package com.StartupManagementSystem.AppDevFinalProject.api.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Submission {
    @Id
    @GeneratedValue
    private Long id;
    private Long deliverableID;
    private String filePath;
    private String orig_path;

    public Submission() {
    }

    public Submission(Long deliverableID, String filePath, String orig_path) {
        this.deliverableID = deliverableID;
        this.filePath = filePath;
        this.orig_path = orig_path;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDeliverableID() {
        return deliverableID;
    }

    public void setDeliverableID(Long deliverableID) {
        this.deliverableID = deliverableID;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getOrig_path() {
        return orig_path;
    }

    public void setOrig_path(String orig_path) {
        this.orig_path = orig_path;
    }
}
