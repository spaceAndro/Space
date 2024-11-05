package com.rubypaper.jpa;

import org.springframework.stereotype.Service;

import com.rubypaper.dto.User;
import com.rubypaper.dto.UserAllergy;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class UserJPA {
	@PersistenceContext
	private EntityManager em;
	
	@Transactional
	public void insert() {
		User user1 = new User();
		user1.setId("qwer");
		user1.setPw("1234");
		user1.setAge(23);
		user1.setName("아무개");
		user1.setGender("male");
		
		// 알러지 테이블도 같이 입력
		UserAllergy allergy = new UserAllergy();
		user1.setUserAllergy(allergy);
		
		em.persist(user1);
	}
}
