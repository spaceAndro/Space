package com.rubypaper.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.rubypaper.service.WeatherService;

@Controller
public class RecommendationController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private WeatherService weatherService; // WeatherService 주입

    @PostMapping("/getRecommendation")
    public String getRecommendation(
            @RequestParam(value = "allergies", required = false) String[] allergies,
            @RequestParam(value = "preferred_ingredient", required = false) String preferredIngredient,
            @RequestParam(value = "cuisine_type", required = false) String cuisineType,
            @RequestParam(value = "food_category", required = false) String foodCategory,
            Model model) {

        // WeatherService에서 날씨 상태와 계절 가져오기
    	String weatherCondition = weatherService.getWeatherCondition();
        String season = weatherService.getSeason();
        model.addAttribute("weather_condition", weatherCondition);
        model.addAttribute("season", season);

        // Flask 서버 URL
        String url = "http://localhost:5000/predict"; // Flask 서버의 URL로 변경하세요.

        // JSON 객체 생성
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("weather_condition", weatherCondition);
        jsonObject.put("season", season);
        jsonObject.put("preferred_ingredient", preferredIngredient);
        jsonObject.put("cuisine_type", cuisineType);
        jsonObject.put("food_category", foodCategory);
        if (allergies != null) {
            jsonObject.put("allergies", String.join(", ", allergies));
        } else {
            jsonObject.put("allergies", "");
        }

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(jsonObject.toString(), headers);

        // POST 요청 보내기
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        // 응답 처리
        if (response.getStatusCode() == HttpStatus.OK) {
            // 응답 본문을 UTF-8로 변환하여 모델에 추가
            JSONObject json = new JSONObject(response.getBody());
            String recommendedFood = json.getString("recommended_food");
            model.addAttribute("recommendedFood", recommendedFood);
            return "index";
        } else {
            model.addAttribute("error", "Failed to get recommendation");
            return "error";
        }
    }
}
