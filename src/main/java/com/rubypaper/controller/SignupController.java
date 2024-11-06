package com.rubypaper.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rubypaper.service.UserService;

@RestController
@RequestMapping("/api/signup")
public class SignupController {
	@Autowired
	UserService userService;
	
	@GetMapping("/checkEmail")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestParam String id) {
        boolean exists = userService.isEmailExists(id); // 이메일 중복 체크 서비스 메서드
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
}
