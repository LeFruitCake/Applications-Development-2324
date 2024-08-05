package com.StartupManagementSystem.AppDevFinalProject.api.Requests;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public class CreateTaskRequest {
    private String title;
    private String instructions;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date due;
    private Long companyID;
    private List<String> deliverables;
    private List<MultipartFile> attachments;
    private Long userID;

    public CreateTaskRequest() {
    }

    public CreateTaskRequest(String title, String instructions, Date due, Long companyID, List<String> deliverables, List<MultipartFile> attachments, Long userID) {
        this.title = title;
        this.instructions = instructions;
        this.due = due;
        this.companyID = companyID;
        this.deliverables = deliverables;
        this.attachments = attachments;
        this.userID = userID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public Date getDue() {
        return due;
    }

    public void setDue(Date due) {
        this.due = due;
    }

    public Long getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Long companyID) {
        this.companyID = companyID;
    }

    public List<String> getDeliverables() {
        return deliverables;
    }

    public void setDeliverables(List<String> deliverables) {
        this.deliverables = deliverables;
    }

    public List<MultipartFile> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<MultipartFile> attachments) {
        this.attachments = attachments;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
}
