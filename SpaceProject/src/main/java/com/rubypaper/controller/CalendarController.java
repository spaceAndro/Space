package com.rubypaper.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.rubypaper.service.UserService;

@Controller
public class CalendarController {
	@Autowired
    private UserService userService;
	
	@GetMapping("/calendar")
    public String calendar(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "음식 캘린더 페이지");
        return "calendar"; // 변경: "thymeleaf/calendar"에서 "calendar"로 수정
    }
}
