package com.rubypaper.jpa;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rubypaper.dto.Calendar;
import com.rubypaper.dto.Meal;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
	// userId로 캘린더 항목을 찾는 메소드
    Optional<Calendar> findByUserIdAndSaveDate(String userId, LocalDate saveDate);
    
    // 특정 월의 날짜 범위에 해당하는 식사 데이터를 가져옴
    List<Calendar> findByUserIdAndSaveDateBetween(String userId, LocalDate startDate, LocalDate endDate);
}
