package com.rubypaper.dto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name="user")
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int uSeq;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private UserAllergy userAllergy;
	
	@Column(unique = true)
	public String id;
	
	public String pw;
	public String name;
	public int age;
	public String gender;
	public String addr;
}
