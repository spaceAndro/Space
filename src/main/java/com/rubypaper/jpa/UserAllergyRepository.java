package com.rubypaper.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rubypaper.dto.User;
import com.rubypaper.dto.UserAllergy;

@Repository
public interface UserAllergyRepository extends JpaRepository<UserAllergy, Integer> {
    UserAllergy findByUser(User user);
}