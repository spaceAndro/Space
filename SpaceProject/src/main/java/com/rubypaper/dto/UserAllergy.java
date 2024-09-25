package com.rubypaper.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class UserAllergy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int allSeq;
	
	// ManyToOne 에서 OneToOne으로 관계 수정
	@OneToOne
	@JoinColumn(name="uSeq")
	private User user;
	
	//9/18 db 내용 수정 (우유, 달걀, 땅콩, 견과류, 해산물, 갑각류, 밀, 대두류) 8가지
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "1")
	public boolean milk = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "2")
	public boolean egg = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "3")
	public boolean peanut = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "4")
	public boolean nuts = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "5")
	public boolean seafood = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "6")
	public boolean shellfish = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "7")
	public boolean wheat = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "8")
	public boolean leguminoseae = false;
}