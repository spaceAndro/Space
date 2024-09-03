package com.rubypaper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class FoodController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String flaskUrl = "http://localhost:5000/recommend";

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        
        // 유저 입력 가정 (임의의 데이터로 변경 가능)
        Map<String, Object> userInput = new HashMap<>();
        userInput.put("allergies", List.of("밀", "유제품"));
        userInput.put("weather", "맑음");
        userInput.put("temperature", "더움");
        userInput.put("situation", "점심");

        // Flask API 호출
        Map<String, Object> response = restTemplate.postForObject(flaskUrl, userInput, Map.class);
        List<String> recommendedFoods = (List<String>) response.get("recommendation");

        // 모델에 추천된 음식을 추가
        model.addAttribute("recommendedFood", recommendedFoods.get(0)); // 첫 번째 추천된 음식
        
        return "index";
    }

    @GetMapping("/restaurant")
    public String restaurant(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "식당 추천 페이지");
        return "restaurant";
    }

    @GetMapping("/calendar")
    public String calendar(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "음식 캘린더 페이지");
        return "calendar";
    }

    @GetMapping("/history")
    public String history(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "지난 먹은 음식 내역 페이지");
        return "history";
    }

    @GetMapping("/profile")
    public String profile(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "내 정보 페이지");
        return "profile";
    }
}
