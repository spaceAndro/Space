package com.rubypaper.dto;

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
	public int fSeq;
	
	public String fName;
	public int kcal;
	public int carbohydrate;
	public int protein;
	public int fat;
	
//	public int gravity;
//	public String ingredient; 임시 삭제
	
	/* 후에 양방향 매핑 실험
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="cSeq", nullable=false)
	private Calendar calendar;
	*/
}