package com.StartupManagementSystem.AppDevFinalProject.api.Requests;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class EditTaskRequest {
    private Long id;
    private String title;
    private String instructions;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date due;

    public EditTaskRequest() {
    }

    public EditTaskRequest(Long id, String title, String instructions, Date due) {
        this.id = id;
        this.title = title;
        this.instructions = instructions;
        this.due = due;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
