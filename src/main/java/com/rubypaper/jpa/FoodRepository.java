package com.rubypaper.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rubypaper.dto.Food;
import java.util.List;
import java.util.Optional;
public interface FoodRepository extends JpaRepository<Food, Integer> {
	Optional<Food> findByfName(String fName);
	
	@Query("SELECT f.fName FROM Food f")
    List<String> findAllFNames();  // 모든 fName을 가져오는 메서드
}
