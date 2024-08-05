package com.StartupManagementSystem.AppDevFinalProject.api.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Attachment {
    @Id
    @GeneratedValue
    private Long id;
    private Long taskID;
    private String filePath;
    private String orig_path;

    public Attachment() {
    }

    public Attachment(Long taskID, String filePath, String orig_path) {
        this.taskID = taskID;
        this.filePath = filePath;
        this.orig_path = orig_path;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTaskID() {
        return taskID;
    }

    public void setTaskID(Long taskID) {
        this.taskID = taskID;
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
