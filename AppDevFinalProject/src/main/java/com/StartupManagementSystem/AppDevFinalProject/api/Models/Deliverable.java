package com.StartupManagementSystem.AppDevFinalProject.api.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Deliverable {
    @Id
    @GeneratedValue
    private Long id;
    private Long taskID;
    private String title;
    private Boolean has_submission;
    private Boolean is_approved;

    public Deliverable() {
    }

    public Deliverable(Long taskID, String title) {
        this.taskID = taskID;
        this.title = title;
        this.has_submission = Boolean.FALSE;
        this.is_approved = Boolean.FALSE;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getHas_submission() {
        return has_submission;
    }

    public void setHas_submission(Boolean has_submission) {
        this.has_submission = has_submission;
    }

    public Boolean getIs_approved() {
        return is_approved;
    }

    public void setIs_approved(Boolean is_approved) {
        this.is_approved = is_approved;
    }
}
