package com.rubypaper.controller;


import java.util.ArrayList;
import java.util.List;

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

import com.rubypaper.dto.User;
import com.rubypaper.dto.UserAllergy;
import com.rubypaper.service.UserService;
import com.rubypaper.service.WeatherService;

@Controller
public class RecommendationController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private WeatherService weatherService; // WeatherService 주입
    
    @Autowired
    private UserService userService; // UserService 주입

    @PostMapping("/getRecommendation")
    public String getRecommendation(
            
            @RequestParam(value = "preferred_ingredient", required = false) String preferredIngredient,
            @RequestParam(value = "cuisine_type", required = false) String cuisineType,
            @RequestParam(value = "food_category", required = false) String foodCategory,
            Model model) {

        // WeatherService에서 날씨 상태와 계절 가져오기
    	String weatherCondition = weatherService.getWeatherCondition();
        String season = weatherService.getSeason();
        model.addAttribute("weather_condition", weatherCondition);
        model.addAttribute("season", season);
        
     // 로그인된 사용자 정보에서 알레르기 정보 가져오기
        User currentUser = userService.getLoggedInUser(); // 현재 로그인한 사용자 가져오기
        UserAllergy userAllergy = currentUser != null ? currentUser.getUserAllergy() : null;

        // 체크된 알레르기 항목만 필터링하여 리스트에 추가
        List<String> allergies = new ArrayList<>();
        if(userAllergy != null) {
        	if (userAllergy.isMilk()) allergies.add("1");
            if (userAllergy.isEgg()) allergies.add("2");
            if (userAllergy.isPeanut()) allergies.add("3");
            if (userAllergy.isNuts()) allergies.add("4");
            if (userAllergy.isSeafood()) allergies.add("5");
            if (userAllergy.isShellfish()) allergies.add("6");
            if (userAllergy.isWheat()) allergies.add("7");
            if (userAllergy.isLeguminoseae()) allergies.add("8");
        }
        
        
        model.addAttribute("allergies", allergies);
        // Flask 서버 URL
        String url = "http://localhost:5000/predict"; // Flask 서버의 URL로 변경하세요.

        // JSON 객체 생성
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("weather_condition", weatherCondition);
        jsonObject.put("season", season);
        jsonObject.put("preferred_ingredient", preferredIngredient);
        jsonObject.put("cuisine_type", cuisineType);
        jsonObject.put("food_category", foodCategory);
        jsonObject.put("allergies", allergies);

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
            return "index2";
        } else {
            model.addAttribute("error", "Failed to get recommendation");
            return "error";
        }
    }
}
