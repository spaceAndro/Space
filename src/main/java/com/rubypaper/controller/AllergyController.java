package com.rubypaper.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.rubypaper.dto.UserAllergy;
import com.rubypaper.service.UserAllergyService;
import com.rubypaper.service.UserService;

@Controller
public class AllergyController {

    @Autowired
    private UserAllergyService userAllergyService;
    

    @Autowired
    private UserService userService;
    
    @GetMapping("/AllergyForm")
    public String AllergyFormPage(Model model) {
        model.addAttribute("allergyForm", new UserAllergy()); // 빈 UserAllergy 객체 추가
        return "AllergyForm"; // 템플릿 파일 이름
    }

    @PostMapping("/submit-survey")
    public String submitSurvey(@ModelAttribute UserAllergy allergyForm, Principal principal) {
        String username = principal.getName();

        if (allergyForm == null) {
            throw new IllegalArgumentException("Allergy form cannot be null");
        }

        // UserAllergy 객체 생성
        UserAllergy userAllergy = new UserAllergy();
        userAllergy.setMilk(allergyForm.isMilk());
        userAllergy.setEgg(allergyForm.isEgg());
        userAllergy.setPeanut(allergyForm.isPeanut());
        userAllergy.setNuts(allergyForm.isNuts());
        userAllergy.setSeafood(allergyForm.isSeafood());
        userAllergy.setShellfish(allergyForm.isShellfish());
        userAllergy.setWheat(allergyForm.isWheat());
        userAllergy.setLeguminoseae(allergyForm.isLeguminoseae());

        // UserAllergyService를 사용하여 알러지 정보 저장
        try {
            userAllergyService.saveUserAllergy(username, userAllergy);
        } catch (Exception e) {
            e.printStackTrace(); // 에러 로그 출력
            // 적절한 오류 페이지로 리다이렉트하거나 에러 메시지 반환
            return "error"; // 에러 처리 후 리다이렉트할 페이지 설정
        }

        return "redirect:/index"; // 수정 후 메인 페이지로 리다이렉트
    }
}