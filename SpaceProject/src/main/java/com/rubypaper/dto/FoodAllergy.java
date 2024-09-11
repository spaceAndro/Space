package com.rubypaper.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class FoodAllergy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int fooSeq;
	
	@ManyToOne
	@JoinColumn(name="fSeq")
	public Food food;
	
	public String milk;
	public String egg;
	public String peanut;
	public String nuts;
	public String seafood;
	public String wheat;
	public String bean;
	public String fruit;
	public String meat;
}
