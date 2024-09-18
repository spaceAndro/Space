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
public class UserAllergy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int allSeq;
	
	@ManyToOne
	@JoinColumn(name="uSeq")
	public User user;
	
	//9/18 db 내용 수정
	public String milk;
	public String egg;
	public String peanut;
	public String nuts;
	public String seafood;
	public String shellfish;
	public String wheat;
	public String bean;
}