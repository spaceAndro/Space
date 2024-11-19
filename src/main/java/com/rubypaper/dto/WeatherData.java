package com.rubypaper.dto;

public class WeatherData {
    private String condition;
    private String season;

    public WeatherData(String condition, String season) {
        this.condition = condition;
        this.season = season;
    }

    public String getCondition() {
        return condition;
    }

    public String getSeason() {
        return season;
    }
}
