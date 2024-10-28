package com.rubypaper.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class AllergyDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int AllDeSeq;
	
	
	public String classification;
	
	
	public String ingredient;
}
