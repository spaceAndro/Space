package com.rubypaper.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.rubypaper.dto.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findById(String id); // 사용자명으로 조회
    
    /*
    @Query("SELECT u.userId FROM User u WHERE u.id = id")
    String findUserIdById(@Param("id") String id);
    */
}
