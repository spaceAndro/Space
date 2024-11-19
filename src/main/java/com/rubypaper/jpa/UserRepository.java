package com.rubypaper.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rubypaper.dto.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findById(String id); // 사용자명으로 조회
    
    @Query("SELECT u.id FROM User u")
    List<String> findAllId();  // 모든 id을 가져오는 메서드
}