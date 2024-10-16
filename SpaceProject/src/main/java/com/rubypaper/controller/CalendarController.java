package com.rubypaper.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.rubypaper.dto.Calendar;
import com.rubypaper.service.CalendarService;

@Controller
public class CalendarController {
	@Autowired
    private CalendarService calendarService;
    
	@GetMapping("/calendar")
    public String calendar(Model model) {
		// 현재 로그인한 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // 사용자 이름 (아이디)

        // 해당 사용자의 캘린더 항목들을 조회합니다.
        List<Calendar> calendarList = calendarService.findCalendarsByUserId(username);
        
        // 가져온 로그 출력
        calendarList.forEach(item -> System.out.println("Calendar item: " + item));
        
        // 모델에 캘린더 데이터를 추가하여 View로 전달합니다.
        model.addAttribute("calendarList", calendarList);
        model.addAttribute("date", LocalDate.now().toString());
        model.addAttribute("message", "음식 캘린더 페이지");
        return "calendar"; // 변경: "thymeleaf/calendar"에서 "calendar"로 수정
    }
}
