package com.rubypaper.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rubypaper.dto.User;
import com.rubypaper.dto.UserAllergy;
import com.rubypaper.jpa.UserAllergyRepository;
import com.rubypaper.jpa.UserRepository;

@Service
public class UserAllergyService {
	
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAllergyRepository userAllergyRepository;

    // 사용자 ID로 알러지 정보 가져오기
    public UserAllergy findByUserUSeq(Integer uSeq) {
        return userAllergyRepository.findByUser_uSeq(uSeq);
    }

    @Transactional
    public void saveUserAllergy(String username, UserAllergy allergyForm) {
        User user = userRepository.findById(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        // 기존 알러지 정보 조회
        UserAllergy existingAllergy = userAllergyRepository.findByUser(user);
        
        if (existingAllergy != null) {
            // 기존의 알러지 정보를 업데이트
            existingAllergy.setMilk(allergyForm.isMilk());
            existingAllergy.setEgg(allergyForm.isEgg());
            existingAllergy.setPeanut(allergyForm.isPeanut());
            existingAllergy.setNuts(allergyForm.isNuts());
            existingAllergy.setSeafood(allergyForm.isSeafood());
            existingAllergy.setShellfish(allergyForm.isShellfish());
            existingAllergy.setWheat(allergyForm.isWheat());
            existingAllergy.setLeguminoseae(allergyForm.isLeguminoseae());

            // 업데이트된 정보를 저장
            userAllergyRepository.save(existingAllergy);
        } else {
            // 기존 알러지 정보가 없으면 새로운 정보를 생성
            allergyForm.setUser(user); // 사용자 연결
            userAllergyRepository.save(allergyForm); // UserAllergy 저장
        }
    }
}