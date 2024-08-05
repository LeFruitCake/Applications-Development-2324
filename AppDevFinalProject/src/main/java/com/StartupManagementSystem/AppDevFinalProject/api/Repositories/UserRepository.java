package com.StartupManagementSystem.AppDevFinalProject.api.Repositories;

import com.StartupManagementSystem.AppDevFinalProject.api.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    public Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.accessType!= 'Head Admin'")
    public List<User> findUsersByNotHeadAdmin();
}
