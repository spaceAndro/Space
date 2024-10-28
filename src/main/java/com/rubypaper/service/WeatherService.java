package com.rubypaper.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private final String apiKey = "d0bf05fe74e94d85eead873e28bbdf43"; // OpenWeather API Key를 입력하세요
    private final String apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=Seoul&units=metric&appid=" + apiKey;

    // 날씨 상태 반환
    public String getWeatherCondition() {
        JSONObject jsonObject = getWeatherData();
        String weatherCondition = jsonObject.getJSONArray("weather").getJSONObject(0).getString("main");
        return mapCondition(weatherCondition);
    }

    // 계절 반환
    public String getSeason() {
        JSONObject jsonObject = getWeatherData();
        double temperature = jsonObject.getJSONObject("main").getDouble("temp");
        return determineSeason(temperature);
    }

    // OpenWeather API로부터 데이터를 받아오는 메소드
    private JSONObject getWeatherData() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(apiUrl, String.class);
        return new JSONObject(response);
    }

    // 날씨 상태를 맵핑하는 메소드
    private String mapCondition(String weatherCondition) {
        switch (weatherCondition) {
            case "Clear":
                return "Clear";
            case "Clouds":
                return "Cloudy";
            case "Rain":
                return "Rain";
            case "Snow":
                return "Snow";
            default:
                return "Clear";
        }
    }

    // 온도에 따라 계절을 결정하는 메소드
    private String determineSeason(double temperature) {
        if (temperature >= 23) {
            return "Summer";
        } else if (temperature >= 17) {
            return "Spring";
        } else if (temperature >= 10) {
            return "Fall";
        } else {
            return "Winter";
        }
    }
}
