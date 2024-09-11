package com.rubypaper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.rubypaper.dto.User;

@Controller
public class SampleController {
	@GetMapping("/sample_i")
	public String sample_insert() {
		User user;
		
		
		return "main";
	}
}
