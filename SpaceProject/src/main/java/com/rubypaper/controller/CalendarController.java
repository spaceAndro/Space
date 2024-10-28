package com.rubypaper.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rubypaper.dto.Calendar;
import com.rubypaper.dto.Meal;
import com.rubypaper.dto.User;
import com.rubypaper.service.CalendarService;
import com.rubypaper.service.FoodService;
import com.rubypaper.service.UserService;

@RestController
@RequestMapping("/api/calendars")
public class CalendarController {	
    @Autowired
    private CalendarService calendarService;
    
    // 특정 월의 모든 식사 데이터를 반환하는 API
    @GetMapping("/month")
    public List<Calendar> getMealsByMonth(@RequestParam String userId, @RequestParam int year, @RequestParam int month) {
        return calendarService.getCalendarsByMonth(userId, year, month);
    }

    // 특정 날짜의 식사 데이터를 반환하는 API
    @GetMapping("/date")
    public Calendar getMealByDate(@RequestParam String userId, @RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date);
        return calendarService.getCalendarsByUserIdAndSaveDate(userId, localDate);
    }
}
