package com.rubypaper.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;


@Entity
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate mealDate; // 날짜

    private String breakfast;   // 아침 메뉴
    private String lunch;       // 점심 메뉴
    private String dinner;      // 저녁 메뉴

    // 기본 생성자
    public Meal() {}

    // 생성자
    public Meal(LocalDate mealDate, String breakfast, String lunch, String dinner) {
        this.mealDate = mealDate;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public LocalDate getMealDate() {
        return mealDate;
    }

    public void setMealDate(LocalDate mealDate) {
        this.mealDate = mealDate;
    }

    public String getBreakfast() {
        return breakfast;
    }

    public void setBreakfast(String breakfast) {
        this.breakfast = breakfast;
    }

    public String getLunch() {
        return lunch;
    }

    public void setLunch(String lunch) {
        this.lunch = lunch;
    }

    public String getDinner() {
        return dinner;
    }

    public void setDinner(String dinner) {
        this.dinner = dinner;
    }
}
