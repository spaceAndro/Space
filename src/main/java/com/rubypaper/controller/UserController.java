package com.rubypaper.controller;

import java.security.Principal;

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
import com.rubypaper.dto.UserAllergy;
import com.rubypaper.service.UserAllergyService;
import com.rubypaper.service.UserService;
import com.rubypaper.service.WeatherService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserAllergyService userAllergyService;
    
    @Autowired
    private WeatherService weatherService;

    @GetMapping("/index")
    public String index(Model model, Principal principal) {
        boolean isAuthenticated = SecurityContextHolder.getContext().getAuthentication() != null &&
                                  SecurityContextHolder.getContext().getAuthentication().isAuthenticated();

        // 로그인 상태 체크
        if (isAuthenticated) {
            String username = principal.getName();
            boolean isFirstLogin = userService.isFirstLogin(username);

            if (isFirstLogin) {
                userService.updateFirstLogin(username);  // 최초 로그인 시 firstLogin 업데이트
            }

            model.addAttribute("isFirstLogin", isFirstLogin);
        }

        model.addAttribute("isAuthenticated", isAuthenticated);
        
        String weatherCondition = weatherService.getWeatherCondition();
        String season = weatherService.getSeason();
        model.addAttribute("weather_condition", weatherCondition);
        model.addAttribute("season", season);

        // 인증되지 않은 사용자가 접근하려면 로그인 모달을 띄우기 위한 flag 전달
        if (!isAuthenticated) {
            model.addAttribute("showLoginModal", true);
        }

        return "index"; // Thymeleaf 템플릿 이름
    }
    

    @GetMapping("/profile")
    public String userInfo(Model model, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        UserAllergy userAllergy = userAllergyService.findByUserUSeq(user.getUSeq());
        
        boolean noAllergy = userAllergy != null && !userAllergy.isMilk() &&
        					!userAllergy.isEgg() && !userAllergy.isPeanut() &&
        					!userAllergy.isNuts() && !userAllergy.isSeafood() &&
        					!userAllergy.isShellfish() && !userAllergy.isWheat() &&
        					!userAllergy.isLeguminoseae();
        
        model.addAttribute("user", user);
        model.addAttribute("userAllergy", userAllergy);
        model.addAttribute("noAllergy", noAllergy);
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
    
    

    
    @GetMapping("/check-first-login")
    public boolean checkFirstLogin(@AuthenticationPrincipal User user) {
        return user.isFirstLogin(); // 최초 로그인 여부 반환
    }

    // 로그인 성공 시 최초 로그인 플래그 업데이트
    @PostMapping("/login-success")
    public void loginSuccess(@AuthenticationPrincipal User user) {
        user.setFirstLogin(false); // 최초 로그인 후 false로 업데이트
        // User 엔티티를 저장하여 DB에 반영
    }
    
    @PostMapping("/deleteAccount")
    public String userDelete(HttpServletRequest request, HttpServletResponse response) {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName(); // 사용자 이름 (아이디)
	    
	    // 사용자 정보 가져오기
        User user = userService.findByUsername(username);
        
        String userId = user.getId();
    	
        userService.deleteCalendarByUserId(userId);
        userService.deleteUser(user);
        
        
     // 세션 무효화
        SecurityContextHolder.clearContext(); // 세션을 완전히 무효화
        
     // 세션과 쿠키 삭제
        request.getSession().invalidate();  // 세션 무효화
        // 쿠키 삭제 (JSESSIONID 쿠키 등)
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);  // 쿠키 만료
        response.addCookie(cookie);

        
        
    	return "redirect:/index";
    }
    
}