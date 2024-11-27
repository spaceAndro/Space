package com.rubypaper.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rubypaper.dto.Food;
import com.rubypaper.service.FoodService;

@RestController
@RequestMapping("/api/meal")
public class MealController {

    @Autowired
    private FoodService foodService;

    // 해당 이름의 음식 정보 데이터를 반환하는 API
    @GetMapping("/food")
    public Food getFoodByFName(@RequestParam String fName) {
        return foodService.getFoodByFName(fName);
    }
}
