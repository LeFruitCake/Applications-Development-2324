package com.StartupManagementSystem.AppDevFinalProject.api.Requests;


import org.springframework.web.multipart.MultipartFile;

public class CompanyRequest {
    private String name;
    private String description;
    private MultipartFile logo;

    public CompanyRequest() {
    }

    public CompanyRequest(String name, String description, MultipartFile logo) {
        this.name = name;
        this.description = description;
        this.logo = logo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MultipartFile getLogo() {
        return logo;
    }

    public void setLogo(MultipartFile logo) {
        this.logo = logo;
    }
}
