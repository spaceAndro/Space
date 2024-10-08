package com.rubypaper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Controller
public class RecommendationController {

    @Autowired
    private RestTemplate restTemplate;
    
    @GetMapping("/index2")
    public String index2(Model model) {

        return "index2"; // 변경: "thymeleaf/restaurant"에서 "restaurant"로 수정
    }

    @PostMapping("/getRecommendation")
    public String getRecommendation(
            @RequestParam("weather_condition") String weatherCondition,
            @RequestParam("season") String season,
            @RequestParam(value = "allergies", required = false) String[] allergies,
            @RequestParam(value = "preferred_ingredient", required = false) String preferredIngredient,
            @RequestParam(value = "cuisine_type", required = false) String cuisineType,
            @RequestParam(value = "food_category", required = false) String foodCategory,
            Model model) {

        // 요청 데이터 설정
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("weather_condition", weatherCondition);
        requestData.put("season", season);
        requestData.put("allergies", allergies != null ? allergies : new String[]{});
        requestData.put("preferred_ingredient", preferredIngredient != null ? preferredIngredient : "");
        requestData.put("cuisine_type", cuisineType != null ? cuisineType : "없음");
        requestData.put("food_category", foodCategory != null ? foodCategory : "없음");

        // Flask 서버로 요청 보내기
        String flaskUrl = "http://localhost:5000/predict";
        Map<String, String> response = restTemplate.postForObject(flaskUrl, requestData, Map.class);

        // 추천 결과를 모델에 추가하여 뷰로 전달
        if (response != null) {
            model.addAttribute("recommendedFood", response.get("recommended_food"));
        } else {
            model.addAttribute("recommendedFood", "No recommendation available");
        }

        return "index"; // 결과를 표시할 페이지 (index2.html)
    }
}

