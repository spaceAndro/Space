package com.rubypaper.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rubypaper.dto.Calendar;
import com.rubypaper.jpa.CalendarRepository;

@Service
public class CalendarService {
	@Autowired
    private CalendarRepository calendarRepository;
    
    // 특정 userId에 해당하는 캘린더 항목 리스트를 반환
    public List<Calendar> findCalendarsByUserId(String userId) {
        return calendarRepository.findByUserId(userId);
    }
}
