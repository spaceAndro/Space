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
	
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "1")
	public boolean milk;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "2")
	public boolean egg;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "3")
	public boolean peanut;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "4")
	public boolean nuts;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "5")
	public boolean seafood;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "6")
	public boolean shellfish;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "7")
	public boolean wheat;
	@Column(columnDefinition = "TINYINT(1) DEFAULT 0", name = "8")
	public boolean leguminoseae;
}
