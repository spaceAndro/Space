package com.rubypaper.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rubypaper.dto.Food;
import com.rubypaper.dto.Meal;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
public interface FoodRepository extends JpaRepository<Food, Integer> {
	Optional<Food> findByFName(String fName);
}
