package com.rubypaper.dto;

import jakarta.persistence.CascadeType;
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
	@OneToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "uSeq") // 외래 키로 User의 u_seq를 사용
	private User user;
	
	//9/18 db 내용 수정 (우유, 달걀, 땅콩, 견과류, 해산물, 갑각류, 밀, 대두류) 8가지
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "milk")
	public boolean milk = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "egg")
	public boolean egg = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "peanut")
	public boolean peanut = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "nuts")
	public boolean nuts = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "seafood")
	public boolean seafood = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "shellfish")
	public boolean shellfish = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "wheat")
	public boolean wheat = false;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "leguminoseae")
	public boolean leguminoseae = false;
}