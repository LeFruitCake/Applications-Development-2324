package com.StartupManagementSystem.AppDevFinalProject.api.Controllers;


import com.StartupManagementSystem.AppDevFinalProject.api.Models.Company;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.CompanyRequest;
import com.StartupManagementSystem.AppDevFinalProject.api.Services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/company")
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/create")
    public ResponseEntity<Boolean> createCompany(@ModelAttribute CompanyRequest companyRequest){
        return ResponseEntity.ok(companyService.createCompany(companyRequest));
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteCompany(@RequestBody Map<String, Long> id){
        if(companyService.deleteCompany(id.get("id"))){
            return ResponseEntity.ok("Successfully Deleted Company.");
        }
        return ResponseEntity.notFound().build();
    }

//    @PutMapping("/edit")
//    public ResponseEntity<String> editCompany(@ModelAttribute CompanyRequest companyRequest){
//        if(companyService.editCompany(companyRequest)){
//            return  ResponseEntity.ok("Changes saved.");
//        }
//        return ResponseEntity.unprocessableEntity().build();
//    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Company>> getAllCompanies(){
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    @GetMapping("/getCompany")
    public ResponseEntity<Company> getCompany(@RequestParam Long id){
        return ResponseEntity.ok(companyService.getCompany(id));
    }
}
