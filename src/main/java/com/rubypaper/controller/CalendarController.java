package com.rubypaper.controller;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rubypaper.dto.Calendar;
import com.rubypaper.dto.User;
import com.rubypaper.jpa.CalendarRepository;
import com.rubypaper.service.CalendarService;
import com.rubypaper.service.FoodService;
import com.rubypaper.service.UserService;

@RestController
@RequestMapping("/api/calendars")
public class CalendarController {	
	 @Autowired
	private CalendarRepository calendarRepository;
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
    @GetMapping("/getMeal")
    public String getMealBasedOnTime() {
        // SecurityContextHolder를 통해 현재 사용자 ID 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName(); // 현재 로그인된 사용자의 ID

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        // 현재 사용자와 날짜에 맞는 Calendar 엔티티를 찾기
        Optional<Calendar> calendarOpt = calendarRepository.findByUserIdAndSaveDate(userId, today);
        
        if (calendarOpt.isPresent()) {
            Calendar calendar = calendarOpt.get();

            // 현재 시간에 따라 아침, 점심, 저녁 중 하나 선택
            if (now.isBefore(LocalTime.of(10, 0))) {
                return calendar.getBreakfast();
            } else if (now.isBefore(LocalTime.of(15, 0))) {
                return calendar.getLunch();
            } else {
                return calendar.getDinner();
            }
        } else {
            return "해당 날짜에 등록된 식사가 없습니다.";
        }
    }
    
}
