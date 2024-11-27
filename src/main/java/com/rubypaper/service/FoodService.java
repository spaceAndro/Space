package com.rubypaper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rubypaper.dto.Food;
import com.rubypaper.jpa.FoodRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    // 특정 날짜의 식사 데이터를 반환
    public Food getFoodByFName(String fName) {
        return foodRepository.findByfName(fName).orElse(null);
    }
}

