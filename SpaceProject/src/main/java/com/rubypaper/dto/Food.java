package com.rubypaper.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name="food")
@Entity
public class Food {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "f_seq")
	public int fSeq;
	
	@Column(name = "f_name")
	public String fName;
	public int kcal;
	public int carbohydrate;
	public int protein;
	public int fat;
	
//	public int gravity;
//	public String ingredient; 임시 삭제
}