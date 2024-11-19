package com.rubypaper.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.rubypaper.dto.Calendar;
import com.rubypaper.dto.User;
import com.rubypaper.jpa.FoodRepository;
import com.rubypaper.service.CalendarService;
import com.rubypaper.service.UserService;
import com.rubypaper.service.WeatherService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Controller
public class FoodController {
	
	@Autowired
    private WeatherService weatherService;
	
	@Autowired
	private CalendarService calendarService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private FoodRepository foodRepository;
	/*
	@GetMapping("/index")
    public String home(Model model) {
        // 날짜 추가
        model.addAttribute("date", LocalDate.now().toString().replace("-", "."));

        // 음식 추천 추가
        List<String> foods = List.of("비빔밥", "된장찌개", "김치찌개", "불고기", "떡볶이");
        String recommendedFood = foods.get(new Random().nextInt(foods.size()));
        model.addAttribute("recommendedFood", recommendedFood);

        // 날씨 정보 추가
        String weather = weatherService.getSeoulWeather();  // 서울 날씨 정보 가져오기
        model.addAttribute("weather", weather);

        return "index";  // index.html 템플릿을 반환
    }
    */
    
	@GetMapping("/index2")
    public String index2(Model model) {

        return "index2"; // 변경: "thymeleaf/restaurant"에서 "restaurant"로 수정
    }
	
	@GetMapping("/foodUpdate")
	public String foodUpdate(Model model) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName(); // 사용자 이름 (아이디)
	    
	    // 사용자 정보 가져오기
        User user = userService.findByUsername(username);
        String userId = user.getId();
        
		model.addAttribute("userId", userId);
		
		return "foodUpdate";
	}
	
	@GetMapping("/foodDelete")
	public String deleteFood(@RequestParam("date") String date) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName(); // 사용자 이름 (아이디)
	    
	    // 사용자 정보 가져오기
        User user = userService.findByUsername(username);
        String userId = user.getId();
        
        LocalDate localDate = LocalDate.parse(date);
        
        calendarService.deleteCalendar(userId, localDate);
	    
	    // 데이터 삭제 후 리다이렉트 또는 삭제 완료 페이지 반환
	    return "redirect:/calendar";
	}
	
	@PostMapping("/changeFood")
	public String changeFood(@RequestParam("breakfast") String breakfast,
				             @RequestParam("lunch") String lunch,
				             @RequestParam("dinner") String dinner,
				             @RequestParam("savedDate") String savedDate,
							 RedirectAttributes redirectAttributes) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String username = authentication.getName(); // 사용자 이름 (아이디)
	    
	    // 사용자 정보 가져오기
        User user = userService.findByUsername(username);
        String userId = user.getId();
        
        LocalDate localDate = LocalDate.parse(savedDate);
        
        Calendar calendar = calendarService.getCalendarsByUserIdAndSaveDate(userId, localDate);
        
        List<String> allFNames = foodRepository.findAllFNames();
        
    	boolean bFlag = false;
    	boolean lFlag = false;
    	boolean dFlag = false;
    	
        for (String fName : allFNames) {
            if (breakfast.equals(fName) || breakfast == "") {
            	bFlag = true;
            }
            if (lunch.equals(fName) || lunch == "") {
            	lFlag = true;
            }
            if (dinner.equals(fName) || dinner == "") {
            	dFlag = true;
            }
            if(bFlag && lFlag && dFlag)
            	break;
        }
        if(!bFlag || !lFlag || !dFlag) {
        	redirectAttributes.addFlashAttribute("error", "문제가 생겨 작업하지 못했습니다");
        	calendarService.deleteCalendar(userId, localDate);
        	return "redirect:/calendar";
        }
        
        calendarService.saveCalendar(calendar, breakfast, lunch, dinner);
		
		return "redirect:/calendar";
	}
}
