package com.StartupManagementSystem.AppDevFinalProject.api.Services;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.Company;
import com.StartupManagementSystem.AppDevFinalProject.api.Repositories.CompanyRepository;
import com.StartupManagementSystem.AppDevFinalProject.api.Requests.CompanyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CompanyService {


    private String file_path = "C:/Users/USER/OneDrive - Cebu Institute of Technology University/Documents/CIT-U Files/Applications Development/fullstack clone/Frontend/smsfrontend/public/";


    @Autowired
    private CompanyRepository companyRepository;

    public Boolean createCompany(CompanyRequest companyRequest){
        Company company = new Company();
        String filepath = "";
        if (!companyRequest.getLogo().isEmpty()){
            String uniqueFileName = UUID.randomUUID() + companyRequest.getLogo().getOriginalFilename();
            filepath = file_path+uniqueFileName;
            try {
                companyRequest.getLogo().transferTo(new File(filepath));
                company.setLogo(uniqueFileName);
            } catch (IOException e) {
                System.out.print(e.getMessage());
                return Boolean.FALSE;
            }
        }
            company.setName(companyRequest.getName());
            company.setDescription(companyRequest.getDescription());
            companyRepository.save(company);
            return Boolean.TRUE;
    }

//    public Boolean editCompany(CompanyRequest companyRequest){
//        Optional<Company> edit_company = companyRepository.findByName(companyRequest.getName());
//        if(edit_company.isPresent()){
//            Company company = edit_company.get();
//
//            if (!companyRequest.getLogo().isEmpty()){
//
//                //Delete Previous company logo
//                File logo = new File(company.getLogo());
//                if (logo.exists()){
//                    if (!logo.delete()) {
//                        throw new RuntimeException("Failed to delete file: " + company.getLogo());
//                    }
//                }
//
//                //Upload the new company logo
//                String uniqueFileName = UUID.randomUUID() + companyRequest.getLogo().getOriginalFilename();
//                String filepath = file_path+"/"+uniqueFileName;
//                try {
//                    companyRequest.getLogo().transferTo(new File(filepath));
//                    company.setLogo(filepath);
//                } catch (IOException e) {
//                    throw new RuntimeException(e);
//                }
//            }
//            company.setName(companyRequest.getName());
//            company.setDescription(companyRequest.getDescription());
//            companyRepository.save(company);
//            return Boolean.TRUE;
//        }
//        return Boolean.FALSE;
//
//    }

    public Boolean deleteCompany(Long id){
        Optional<Company> company = companyRepository.findById(id);
        File file = new File(file_path+company.get().getLogo());
        if(file.exists()){
            if (!file.delete()) {
                throw new RuntimeException("Failed to delete file: " + company.get().getLogo());
            }
        }
        company.ifPresent(companyRepository::delete);
        return company.isPresent();
    }

    public List<Company> getAllCompanies(){
        return companyRepository.findAll();
    }
    public Company getCompany(Long id){
        return companyRepository.findById(id).get();
    }
}
