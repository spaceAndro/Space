package com.rubypaper.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rubypaper.dto.User;
import com.rubypaper.dto.UserAllergy;
import com.rubypaper.jpa.UserAllergyRepository;
import com.rubypaper.jpa.UserRepository;

@Service
public class UserAllergyService {

    @Autowired
    private UserAllergyRepository userAllergyRepository;

    public void saveUserAllergies(User user, List<String> allergies) {
        UserAllergy userAllergy = userAllergyRepository.findByUser(user);

        if (userAllergy == null) {
            userAllergy = new UserAllergy();
            userAllergy.setUser(user);
        }

        // 기본적으로 모든 알러지 필드는 false로 설정됨
        userAllergy.setMilk(allergies.contains("milk"));
        userAllergy.setEgg(allergies.contains("egg"));
        userAllergy.setPeanut(allergies.contains("peanut"));
        userAllergy.setNuts(allergies.contains("nuts"));
        userAllergy.setSeafood(allergies.contains("seafood"));
        userAllergy.setShellfish(allergies.contains("shellfish"));
        userAllergy.setWheat(allergies.contains("wheat"));
        userAllergy.setLeguminoseae(allergies.contains("Leguminoseae"));

        userAllergyRepository.save(userAllergy);
    }
}