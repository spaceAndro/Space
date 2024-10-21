package com.rubypaper.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.rubypaper.dto.Calendar;
import com.rubypaper.service.CalendarService;

@Controller
public class CalendarController {
	@Autowired
    private CalendarService calendarService;
    
	@GetMapping("/calendar")
    public String calendar(@RequestParam(required = false) Integer year, 
                           @RequestParam(required = false) Integer month, Model model) {
        // 현재 연도와 월을 기본값으로 설정
        LocalDate today = LocalDate.now();
        int currentYear = (year == null) ? today.getYear() : year;
        int currentMonth = (month == null) ? today.getMonthValue() : month;

        // 월이 1보다 작거나 12보다 클 때, 연도를 변경
        if (currentMonth < 1) {
            currentMonth = 12;
            currentYear -= 1;
        } else if (currentMonth > 12) {
            currentMonth = 1;
            currentYear += 1;
        }

        // 선택된 달의 첫째 날과 마지막 날 계산
        LocalDate firstDayOfMonth = LocalDate.of(currentYear, currentMonth, 1);
        LocalDate lastDayOfMonth = firstDayOfMonth.withDayOfMonth(firstDayOfMonth.lengthOfMonth());

        // 첫째 날의 요일 (1:월, 7:일)
        int startDayOfWeek = firstDayOfMonth.getDayOfWeek().getValue();
        startDayOfWeek = (startDayOfWeek == 7) ? 0 : startDayOfWeek; // 일요일을 0으로 설정

        // 날짜들을 주별로 나누기 위한 리스트
        List<List<Integer>> weeks = new ArrayList<>();
        List<Integer> week = new ArrayList<>();

        // 첫째 주 빈 칸 채우기
        for (int i = 0; i < startDayOfWeek; i++) {
            week.add(null);  // 빈 칸을 위해 null 삽입
        }

        // 해당 달의 날짜를 채움
        for (int day = 1; day <= lastDayOfMonth.getDayOfMonth(); day++) {
            week.add(day);
            if (week.size() == 7) {
                weeks.add(week);
                week = new ArrayList<>();
            }
        }

        // 마지막 주가 다 차지 않았을 때 빈 칸 채우기
        if (!week.isEmpty()) {
            while (week.size() < 7) {
                week.add(null);  // 빈 칸을 위해 null 삽입
            }
            weeks.add(week);
        }

        // 모델에 필요한 정보 추가
        model.addAttribute("weeks", weeks);
        model.addAttribute("currentYear", currentYear);
        model.addAttribute("currentMonth", currentMonth);

        return "calendar";  // calendar.html 템플릿 렌더링
    }
}
