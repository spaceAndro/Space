package com.rubypaper.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rubypaper.dto.Meal;
import com.rubypaper.service.MealService;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    @Autowired
    private MealService mealService;
    
    // 특정 월의 모든 식사 데이터를 반환하는 API
    @GetMapping("/month")
    public List<Meal> getMealsByMonth(@RequestParam int year, @RequestParam int month) {
        return mealService.getMealsByMonth(year, month);
    }

    // 특정 날짜의 식사 데이터를 반환하는 API
    @GetMapping("/date")
    public Meal getHighestCalorieMeal(@RequestParam String date) {
        LocalDate localDate = LocalDate.parse(date);
        return mealService.getMealByDate(localDate);
    }
}
