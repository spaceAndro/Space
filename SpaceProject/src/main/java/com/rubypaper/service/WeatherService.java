package com.rubypaper.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@Service
public class WeatherService {

    private final String API_KEY = "d0bf05fe74e94d85eead873e28bbdf43";  // OpenWeather API 키를 여기에 넣으세요
    private final String URL = "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=" + API_KEY + "&units=metric&lang=ko";

    public String getSeoulWeather() {
        // RestTemplate을 사용하여 API 호출
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(URL, String.class);
        return parseWeatherData(response);
    }

    // JSON 데이터를 파싱하고 필요한 정보만 반환하는 메서드
    private String parseWeatherData(String jsonData) {
        JSONObject obj = new JSONObject(jsonData);

        // 도시 이름
        String city = obj.getString("name");
        
        // 날씨 설명
        String weatherDescription = obj.getJSONArray("weather").getJSONObject(0).getString("description");
        
        // 현재 온도, 최저/최고 온도, 습도
        double temp = obj.getJSONObject("main").getDouble("temp");
        double tempMin = obj.getJSONObject("main").getDouble("temp_min");
        double tempMax = obj.getJSONObject("main").getDouble("temp_max");
        int humidity = obj.getJSONObject("main").getInt("humidity");

        // 보기 좋은 형식으로 날씨 정보를 반환
        return String.format("도시: %s\n현재 날씨: %s\n현재 온도: %.2f℃\n습도: %d%%\n최저/최고 온도: %.2f℃ / %.2f℃",
                city, weatherDescription, temp, humidity, tempMin, tempMax);
    }
}
