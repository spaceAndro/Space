package com.rubypaper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	 @Autowired
	    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;


    // PasswordEncoder 빈 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // SecurityFilterChain을 사용해 보안 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/css/**", "/js/**", "/images/**").permitAll() // 정적 리소스 접근 허용
                .requestMatchers("/login", "/signup", "/index", "/").permitAll() // 로그인과 회원가입 페이지는 모두 접근 가능
                .requestMatchers("/api/meals/**").permitAll() // /api/meals 경로 접근 허용
                .anyRequest().authenticated() // 나머지 요청은 인증 필요
            )
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/api/meals/**") // /api/meals 경로는 CSRF 예외 처리
            )
            .formLogin(form -> form
                .loginPage("/login") // 커스텀 로그인 페이지 경로
                .defaultSuccessUrl("/index", true) // 로그인 성공 후 이동할 URL
                .failureUrl("/?error=true") // 로그인 실패 시 index로 리다이렉트하면서 error 파라미터 추가
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/index")  // 로그아웃 후 리다이렉트할 경로 설정
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .clearAuthentication(true) // 인증 정보 초기화
                .permitAll()
            )
            .exceptionHandling(exception -> exception
                    .authenticationEntryPoint(customAuthenticationEntryPoint) // Custom EntryPoint 설정
                );
        

        return http.build();
    }
}
