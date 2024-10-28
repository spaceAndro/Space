package com.rubypaper.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class FoodDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int FoDeSeq;
	
	public String ingredient1;
	public String ingredient2;
	public String food_category; // 면류, 밥류, 고기류 등
	public String food_style; // 한식, 양식, 일식 등
	
}
