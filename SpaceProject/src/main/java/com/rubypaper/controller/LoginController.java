package com.rubypaper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.rubypaper.dto.User;
import com.rubypaper.jpa.UserRepository;
import com.rubypaper.service.UserService;

@Controller
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    

    @GetMapping("/signup")
    public String signupPage() {
        return "signup"; // 회원가입 페이지를 반환
    }
    
    @GetMapping("/login")
    public String loginPage() {
    	return "login.html";
    }
    
    @GetMapping("/")
    public String indexPage() {
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
        user.setAddr(userDTO.getAddr());

        userRepository.save(user); // 사용자 정보를 저장
        return "redirect:/login"; // 로그인 페이지로 리다이렉트
    }
    
      
}