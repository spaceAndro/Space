package com.rubypaper.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rubypaper.dto.Calendar;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
	// userId로 캘린더 항목을 찾는 메소드
    List<Calendar> findByUserId(String userId);
}
