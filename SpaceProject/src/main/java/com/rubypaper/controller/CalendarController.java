package com.rubypaper.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.rubypaper.dto.User;
import com.rubypaper.service.UserService;

@Controller
public class CalendarController {
	@Autowired
    private UserService userService;
    
	@GetMapping("/calendar")
    public String calendar(Model model) {
		// 현재 로그인한 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // 사용자 이름 (아이디)

        // 사용자 정보 가져오기
        User user = userService.findByUsername(username);
        
     // 모델에 사용자 정보 추가
        model.addAttribute("user", user);
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "음식 캘린더 페이지");
        return "calendar"; // 변경: "thymeleaf/calendar"에서 "calendar"로 수정
    }
}
