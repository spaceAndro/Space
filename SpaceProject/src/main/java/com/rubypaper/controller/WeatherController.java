package com.rubypaper.controller;

import com.rubypaper.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/weather")
    public String getWeather(Model model) {
        String weather = weatherService.getSeoulWeather();  // 서울 날씨 정보 가져오기
        model.addAttribute("weather", weather);  // 모델에 날씨 데이터 추가
        return "index";  // index.html을 반환
    }
}
