package com.rubypaper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.rubypaper.dto.User;
import com.rubypaper.jpa.UserJPA;

@Controller
public class SampleController {
	@Autowired
	private UserJPA userJPA; 
	
	@GetMapping("/sample_i")
	public String sample_insert() {
		userJPA.insert();
		
		return "login.html";
	}
}
