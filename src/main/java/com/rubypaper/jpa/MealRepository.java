package com.rubypaper.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rubypaper.dto.Meal;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
public interface MealRepository extends JpaRepository<Meal, Long> {

    // 특정 날짜에 해당하는 식사 데이터를 가져옴
    Optional<Meal> findByMealDate(LocalDate mealDate);

    // 특정 월의 날짜 범위에 해당하는 식사 데이터를 가져옴
    List<Meal> findByMealDateBetween(LocalDate startDate, LocalDate endDate);
}
