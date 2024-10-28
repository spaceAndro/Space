package com.rubypaper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rubypaper.dto.User;
import com.rubypaper.service.UserAllergyService;
import com.rubypaper.service.UserService;

@Controller
public class AllergyController {

    @Autowired
    private UserAllergyService userAllergyService;

    @Autowired
    private UserService userService;
    
    @GetMapping("/AllergyForm")
    public String AllergyFormPage() {
    	return "AllergyForm.html";
    }


    @PostMapping("/submit-survey")
    public String submitAllergySurvey(@AuthenticationPrincipal UserDetails userDetails, 
                                      @RequestParam(value = "allergies", required = false) List<String> allergies) {
        if (userDetails == null) {
            return "redirect:/login"; // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        }

        String username = userDetails.getUsername();
        User user = userService.findByUsername(username);

        if (user != null) {
            // 알러지 정보 저장
            userAllergyService.saveUserAllergies(user, allergies);
        }

        return "redirect:/index"; // 알러지 정보 저장 후 메인 페이지로 리다이렉트
    }
}