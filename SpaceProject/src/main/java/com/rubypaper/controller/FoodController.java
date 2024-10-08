package com.rubypaper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.rubypaper.service.WeatherService;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Controller
public class FoodController {
	
	@Autowired
    private WeatherService weatherService;
	
	/*
	@GetMapping("/index")
    public String home(Model model) {
        // 날짜 추가
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));

        // 음식 추천 추가
        List<String> foods = List.of("비빔밥", "된장찌개", "김치찌개", "불고기", "떡볶이");
        String recommendedFood = foods.get(new Random().nextInt(foods.size()));
        model.addAttribute("recommendedFood", recommendedFood);

        // 날씨 정보 추가
        String weather = weatherService.getSeoulWeather();  // 서울 날씨 정보 가져오기
        model.addAttribute("weather", weather);

        return "index";  // index.html 템플릿을 반환
    }
    */
    

    @GetMapping("/restaurant")
    public String restaurant(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "식당 추천 페이지");
        return "restaurant"; // 변경: "thymeleaf/restaurant"에서 "restaurant"로 수정
    }

    @GetMapping("/history")
    public String history(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "지난 먹은 음식 내역 페이지");
        return "history"; // 변경: "thymeleaf/history"에서 "history"로 수정
    }
}
