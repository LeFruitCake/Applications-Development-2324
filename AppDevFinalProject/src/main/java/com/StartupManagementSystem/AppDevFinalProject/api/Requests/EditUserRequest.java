package com.StartupManagementSystem.AppDevFinalProject.api.Requests;

public class EditUserRequest {
    private Long userID;
    private Long companyID;
    private String accessType;

    public EditUserRequest(Long userID, Long companyID, String accessType) {
        this.userID = userID;
        this.companyID = companyID;
        this.accessType = accessType;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public Long getCompanyID() {
        return companyID;
    }

    public void setCompanyID(Long companyID) {
        this.companyID = companyID;
    }

    public String getAccessType() {
        return accessType;
    }

    public void setAccessType(String accessType) {
        this.accessType = accessType;
    }
}
