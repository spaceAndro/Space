package com.rubypaper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Controller
public class FoodController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        List<String> foods = List.of("비빔밥", "된장찌개", "김치찌개", "불고기", "떡볶이");
        String recommendedFood = foods.get(new Random().nextInt(foods.size()));
        model.addAttribute("recommendedFood", recommendedFood);
        return "index"; // 변경: "thymeleaf/index"에서 "index"로 수정
    }

    @GetMapping("/restaurant")
    public String restaurant(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "식당 추천 페이지");
        return "restaurant"; // 변경: "thymeleaf/restaurant"에서 "restaurant"로 수정
    }

    @GetMapping("/calendar")
    public String calendar(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "음식 캘린더 페이지");
        return "calendar"; // 변경: "thymeleaf/calendar"에서 "calendar"로 수정
    }

    @GetMapping("/history")
    public String history(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "지난 먹은 음식 내역 페이지");
        return "history"; // 변경: "thymeleaf/history"에서 "history"로 수정
    }

    @GetMapping("/profile")
    public String profile(Model model) {
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));
        model.addAttribute("message", "내 정보 페이지");
        return "profile"; // 변경: "thymeleaf/profile"에서 "profile"로 수정
    }
}
