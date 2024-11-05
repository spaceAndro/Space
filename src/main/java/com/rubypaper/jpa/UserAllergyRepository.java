package com.rubypaper.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rubypaper.dto.User;
import com.rubypaper.dto.UserAllergy;

@Repository
public interface UserAllergyRepository extends JpaRepository<UserAllergy, Integer> {
    UserAllergy findByUser(User user);
    UserAllergy findByUser_uSeq(Integer uSeq); // User의 uSeq로 알러지 정보 조회
    
    void deleteByUser(User user); // 사용자로 알러지 정보 삭제
}