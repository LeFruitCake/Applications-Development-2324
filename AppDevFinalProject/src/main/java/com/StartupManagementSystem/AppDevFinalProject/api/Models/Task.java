package com.StartupManagementSystem.AppDevFinalProject.api.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


@Entity
public class Task {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String instructions;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ")
    private Date due;
    private Long companyID;
    @Column(columnDefinition = "int default 0")
    private int progress;

    public Task() {
    }

    public Task(Long id, String title, String instructions, Date due, Long companyID, int progress) {
        this.id = id;
        this.title = title;
        this.instructions = instructions;
        this.due = due;
        this.companyID = companyID;
        this.progress = progress;
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

    public Long getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Long companyID) {
        this.companyID = companyID;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }
}
