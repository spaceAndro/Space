package com.rubypaper.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.rubypaper.dto.User;
import com.rubypaper.jpa.CalendarRepository;
import com.rubypaper.jpa.UserAllergyRepository;
import com.rubypaper.jpa.UserRepository;

import jakarta.transaction.Transactional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CalendarRepository calendarRepository;
    
    @Autowired
    private UserAllergyRepository userAllergyRepository;

    public User findByUsername(String username) {
        return userRepository.findById(username).orElse(null);
    }
    
    public boolean isFirstLogin(String username) {
        // Optional로 반환된 값을 처리
        Optional<User> optionalUser = userRepository.findById(username);
        return optionalUser.map(User::isFirstLogin).orElse(false); // 값이 있을 때만 isFirstLogin 호출, 없으면 false 반환
    }

    public void updateFirstLogin(String username) {
        Optional<User> optionalUser = userRepository.findById(username);
        optionalUser.ifPresent(user -> {
            if (user.isFirstLogin()) {
                user.setFirstLogin(false);
                userRepository.save(user);
            }
        });
    }
    
	// 현재 로그인된 사용자 가져오기
    public User getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return findByUsername(username);
    }

    // id 중복검사
    public boolean isEmailExists(String id) {
    	List<String> allUser = userRepository.findAllId();
    	
    	for(String user : allUser) {
    		System.out.println(user);
    		if(id.equals(user))
    			return true;
    	}
    	
    	return false;
    }
    
    // Calendar 정보 삭제
    @Transactional
    public void deleteCalendarByUserId(String userId) {
        calendarRepository.deleteByUserId(userId); // CalendarRepository에서 userId 기반 삭제 메서드
    }

    // User 삭제
    @Transactional
    public void deleteUser(User user) {
        userRepository.delete(user); // UserRepository에서 해당 User 삭제
    }
}