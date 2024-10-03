package com.rubypaper.controller;

import com.rubypaper.dto.User;
import com.rubypaper.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public String profile(Model model) {
        // 현재 로그인한 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // 사용자 이름 (아이디)

        // 사용자 정보 가져오기
        User user = userService.findByUsername(username);

        // 모델에 사용자 정보 추가
        model.addAttribute("user", user);
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "내 정보 페이지");
        
        return "profile"; // profile.html 템플릿 반환
    }
    
    @GetMapping("/index2")
    public String das(Model model) {
    	// 현재 로그인한 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // 사용자 이름 (아이디)

        // 사용자 정보 가져오기
        User user = userService.findByUsername(username);

        // 모델에 사용자 정보 추가
        model.addAttribute("user", user);
        
    	return "index2";
    }
    
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {    
            new SecurityContextLogoutHandler().logout(request, response, auth);  // 로그아웃 처리
        }
        return "login";  // 로그아웃 후 로그인 페이지로 리다이렉트
    }
}