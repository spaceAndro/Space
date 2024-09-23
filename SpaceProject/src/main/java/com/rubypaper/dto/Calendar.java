package com.rubypaper.dto;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Calendar {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int cSeq;
	
	public Date saveDate;
	/* 후에 매핑 실험할 것
	@OneToMany
	private List<Food> foodList = new ArrayList<Food>();
	*/
}
