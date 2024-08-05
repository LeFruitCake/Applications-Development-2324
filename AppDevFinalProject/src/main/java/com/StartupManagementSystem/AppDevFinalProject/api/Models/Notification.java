package com.StartupManagementSystem.AppDevFinalProject.api.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Notification {
    @Id
    @GeneratedValue
    private Long id;
    private int activity;
    private String username;
    private String photoURL;
    private Long companyID;
    private Long taskID;
    private String taskName;
    private Date date;

    public Notification() {
    }

    public Notification(int activity, String username, String photoURL, Long companyID, Long taskID, String taskName, Date date) {
        this.activity = activity;
        this.username = username;
        this.photoURL = photoURL;
        this.companyID = companyID;
        this.taskID = taskID;
        this.taskName = taskName;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public int getActivity() {
        return activity;
    }

    public void setActivity(int activity) {
        this.activity = activity;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public Long getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Long companyID) {
        this.companyID = companyID;
    }

    public Long getTaskID() {
        return taskID;
    }

    public void setTaskID(Long taskID) {
        this.taskID = taskID;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
