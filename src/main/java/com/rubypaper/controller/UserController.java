package com.rubypaper.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.rubypaper.dto.User;
import com.rubypaper.service.UserService;
import com.rubypaper.service.WeatherService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private WeatherService weatherService;

    @GetMapping("/index")
    public String index(Model model) {
        boolean isAuthenticated = SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
        model.addAttribute("isAuthenticated", isAuthenticated);
        String weatherCondition = weatherService.getWeatherCondition();
        String season = weatherService.getSeason();
        model.addAttribute("weather_condition", weatherCondition);
        model.addAttribute("season", season);
        return "index"; // Thymeleaf 템플릿 이름
    }

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
    @GetMapping("/calendar")
    public String calendarPage(Model model) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName(); // 사용자 이름 (아이디)
	    
	    // 사용자 정보 가져오기
        User user = userService.findByUsername(username);
        String userId = user.getId();
        model.addAttribute("userId", userId);
        
        System.out.println(userId);
        
    	return "calendar";
    }
    
    
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {    
            new SecurityContextLogoutHandler().logout(request, response, auth);  // 로그아웃 처리
        }
        return "login";  // 로그아웃 후 로그인 페이지로 리다이렉트
    }
    
	/*
	 * @GetMapping("/check-first-login") public boolean
	 * checkFirstLogin(@AuthenticationPrincipal User user) { return
	 * user.isFirstLogin(); // 최초 로그인 여부 반환 }
	 * 
	 * // 로그인 성공 시 최초 로그인 플래그 업데이트
	 * 
	 * @PostMapping("/login-success") public void
	 * loginSuccess(@AuthenticationPrincipal User user) { user.setFirstLogin(false);
	 * // 최초 로그인 후 false로 업데이트 // User 엔티티를 저장하여 DB에 반영 }
	 */
}