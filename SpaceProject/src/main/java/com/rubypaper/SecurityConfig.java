package com.rubypaper;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.rubypaper.service.CustomUserDetailsService;


@Configuration
public class SecurityConfig {

    // PasswordEncoder 빈 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // SecurityFilterChain을 사용해 보안 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // CSRF를 비활성화할 경우 사용
            .authorizeHttpRequests((requests) -> requests
                .requestMatchers("/css/**", "/js/**", "/images/**").permitAll() // 정적 리소스 접근 허용
                .requestMatchers("/login", "/signup").permitAll() // 로그인과 회원가입 페이지는 모두 접근 가능
                .anyRequest().authenticated() // 나머지 요청은 인증 필요
            )
            .formLogin((form) -> form
                .loginPage("/login") // 커스텀 로그인 페이지 경로
                .defaultSuccessUrl("/index", true) // 로그인 성공 후 이동할 URL
                .permitAll()
            )
            .logout((logout) -> logout
                .permitAll() // 로그아웃은 모두 접근 가능
            );
        
        return http.build();
    }
}