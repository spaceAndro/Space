package com.rubypaper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rubypaper.dto.User;
import com.rubypaper.jpa.UserRepository;
import com.rubypaper.service.UserService;
import com.rubypaper.service.WeatherService;

@Controller
public class LoginController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private WeatherService weatherService; // WeatherService 주입
    

    @GetMapping("/signup")
    public String signupPage() {
        return "signup"; // 회원가입 페이지를 반환
    }
    
    @GetMapping("/login")
    public String loginPage() {
    	
    	return "login.html";
    }
    
    @GetMapping("/loginSuccess")
    public String loginSuccess(Model model, Authentication authentication) {
        String username = authentication.getName();
        
        if (userService.isFirstLogin(username)) {
            // 최초 로그인 시 firstLogin 값을 false로 업데이트
            userService.updateFirstLogin(username);
            return "redirect:/AllergyForm"; // 설문조사 페이지로 리다이렉트
        }
        
        return "redirect:/index"; // 일반 로그인 성공 시 인덱스 페이지로 이동
    }

    
    
    @GetMapping("/")
    public String indexPage(@RequestParam(value = "error", required = false) String error, Model model) {
    	String weatherCondition = weatherService.getWeatherCondition();
        String season = weatherService.getSeason();
        model.addAttribute("weather_condition", weatherCondition);
        model.addAttribute("season", season);
        if (error != null) {
            model.addAttribute("loginError", true); // 에러 상태를 모델에 추가
        } else {
            model.addAttribute("loginError", false); // 에러가 없을 경우 false로 설정
        }
        return "index"; // index.html 반환
    }
	/*
	 * @GetMapping("/index") public String index() { return "index.html"; }
	 */
    @PostMapping("/signup")
    public String registerUser(@ModelAttribute User userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setPw(passwordEncoder.encode(userDTO.getPw())); // 비밀번호 암호화
        user.setName(userDTO.getName());
        user.setAge(userDTO.getAge());
        user.setGender(userDTO.getGender());

        userRepository.save(user); // 사용자 정보를 저장
        return "redirect:/index"; // 로그인 페이지로 리다이렉트
    }
    
      
}