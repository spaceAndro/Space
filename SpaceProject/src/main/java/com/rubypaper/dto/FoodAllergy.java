package com.rubypaper.dto;

import jakarta.persistence.Column;
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
	
	//9/18 db 내용 수정
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0")
	public boolean milk;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0")
	public boolean egg;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0")
	public boolean peanut;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0")
	public boolean nuts;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0")
	public boolean seafood;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0")
	public boolean shellfish;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0")
	public boolean wheat;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0")
	public boolean Leguminoseae;
}
