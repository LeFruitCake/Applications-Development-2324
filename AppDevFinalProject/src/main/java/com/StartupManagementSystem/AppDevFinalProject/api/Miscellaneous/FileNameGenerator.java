package com.StartupManagementSystem.AppDevFinalProject.api.Miscellaneous;
import java.util.UUID;

public class FileNameGenerator {
    public FileNameGenerator() {
    }
    public String generate(String filename){
        return UUID.randomUUID()+filename;
    }
}
