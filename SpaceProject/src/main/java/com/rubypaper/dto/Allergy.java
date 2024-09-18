package com.rubypaper.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name="allergy")
@Entity
public class Allergy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="allergy_seq")
	public int aSeq;
	
	public String milk;
	public String egg;
	public String peanut;
	public String nuts;
	public String seafood;
	public String shellfish;
	public String wheat;
	public String bean;
}
