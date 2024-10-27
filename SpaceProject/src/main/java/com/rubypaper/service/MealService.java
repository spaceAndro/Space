package com.rubypaper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rubypaper.dto.Meal;
import com.rubypaper.jpa.MealRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;

    // 특정 월의 모든 식사 데이터를 반환
    public List<Meal> getMealsByMonth(int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
        return mealRepository.findByMealDateBetween(startDate, endDate);
    }

    // 특정 날짜의 식사 데이터를 반환
    public Meal getMealByDate(LocalDate date) {
        return mealRepository.findByMealDate(date).orElse(null);
    }
}

