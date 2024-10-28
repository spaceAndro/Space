package com.rubypaper.dto;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
public class Calendar {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="c_seq")
	public int cSeq;
	
	public String userId;
	
	@Column(nullable = false)
	public LocalDate saveDate;
	
	private String breakfast;   // 아침 메뉴
    private String lunch;       // 점심 메뉴
    private String dinner;      // 저녁 메뉴
}