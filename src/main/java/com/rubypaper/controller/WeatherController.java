/*
 * package com.rubypaper.controller;
 * 
 * import com.rubypaper.dto.WeatherData; import
 * com.rubypaper.service.WeatherService; import
 * org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.stereotype.Controller; import
 * org.springframework.ui.Model; import
 * org.springframework.web.bind.annotation.GetMapping;
 * 
 * @Controller public class WeatherController {
 * 
 * @Autowired private WeatherService weatherService;
 * 
 * @GetMapping("/getWeatherData") public String getWeatherData(Model model) {
 * WeatherData weatherData = weatherService.getWeather();
 * model.addAttribute("weather_condition", weatherData.getCondition());
 * model.addAttribute("season", weatherData.getSeason()); return "index2"; } }
 */