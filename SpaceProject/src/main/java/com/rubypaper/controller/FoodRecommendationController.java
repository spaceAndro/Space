package com.rubypaper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
public class FoodRecommendationController {

	@PostMapping("/recommend")
	public String getFoodRecommendation(
	        @RequestParam("weather_condition") String weatherCondition,
	        @RequestParam("season") String season,
	        @RequestParam("allergies") String[] allergies,
	        @RequestParam("cuisine_type") String cuisineType,
	        @RequestParam("food_category") String foodCategory,
	        Model model) {

	    // AI 모델 API에 전달할 데이터 설정
	    Map<String, Object> requestData = new HashMap<>();
	    requestData.put("weather_condition", weatherCondition);
	    requestData.put("season", season);
	    requestData.put("allergies", allergies);
	    requestData.put("cuisine_type", cuisineType);
	    requestData.put("food_category", foodCategory);

	    // Python Flask API 호출
	    RestTemplate restTemplate = new RestTemplate();
	    String apiUrl = "http://127.0.0.1:5000/predict";  // localhost 대신 127.0.0.1 사용

	    // 요청을 보낼 때 JSON 형식으로 변환
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Content-Type", "application/json");
	    HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestData, headers);

	    try {
	        // POST 요청을 통해 Flask API에 데이터 전송
	        ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, requestEntity, Map.class);
	        if (response.getStatusCode() == HttpStatus.OK) {
	            Map<String, String> body = response.getBody();
	            String recommendedFood = body.get("recommended_food");
	            model.addAttribute("recommendedFood", recommendedFood);
	        } else {
	            model.addAttribute("recommendedFood", "추천된 음식이 없습니다.");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        model.addAttribute("recommendedFood", "오류가 발생했습니다.");
	    }

	    return "index";  // index.html로 이동
	}
}
