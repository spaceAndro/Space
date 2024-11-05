	    document.addEventListener("DOMContentLoaded", function() {
	        // 로그아웃 버튼 클릭 시 AJAX 요청
	        const logoutBtn = document.getElementById("logoutBtn");

	        if (logoutBtn) {
	            logoutBtn.addEventListener("click", function(event) {
	                event.preventDefault(); // 기본 링크 동작 막기

	                const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
	                const csrfHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');

	                fetch("/logout", {
	                    method: "POST",
	                    headers: {
	                        "Content-Type": "application/x-www-form-urlencoded",
	                        [csrfHeader]: csrfToken // CSRF 토큰 추가
	                    }
	                })
	                .then(response => {
	                    if (response.ok) {
	                        window.location.href = "/index"; // 로그아웃 후 리다이렉트할 페이지로 이동
	                    } else {
	                        console.error("로그아웃 요청 실패: " + response.status);
	                    }
	                })
	                .catch(error => {
	                    console.error("로그아웃 중 오류 발생: ", error);
	                });
	            });
	        }

	        // 로그인 버튼 클릭 시 모달 열기
	        const loginBtn = document.getElementById("loginBtn");
	        if (loginBtn) {
	            loginBtn.addEventListener("click", function(event) {
	                event.preventDefault(); // 기본 동작 막기

	                const xhr = new XMLHttpRequest();
	                xhr.open("GET", "/login", true);
	                xhr.onreadystatechange = function() {
	                    if (xhr.readyState === 4 && xhr.status === 200) {
	                        document.getElementById("modalContent").innerHTML = xhr.responseText;
	                        document.getElementById("loginModal").style.display = "flex";
	                        document.body.style.overflow = "auto";
	                    } else if (xhr.readyState === 4) {
	                        console.error("AJAX 요청 실패: " + xhr.status);
	                    }
	                };
	                xhr.send();
	            });
	        }

	        // 회원가입 버튼 클릭 시 모달 열기
	        const signupBtn = document.getElementById("signupBtn");
	        if (signupBtn) {
	            signupBtn.addEventListener("click", function(event) {
	                event.preventDefault(); // 기본 동작 막기

	                const xhr = new XMLHttpRequest();
	                xhr.open("GET", "/signup", true);
	                xhr.onreadystatechange = function() {
	                    if (xhr.readyState === 4 && xhr.status === 200) {
	                        document.getElementById("signupModalContent").innerHTML = xhr.responseText;
	                        document.getElementById("signupModal").style.display = "flex";
	                        document.body.style.overflow = "auto";
	                    } else if (xhr.readyState === 4) {
	                        console.error("AJAX 요청 실패: " + xhr.status);
	                    }
	                };
	                xhr.send();
	            });
	        }
	    });

	    // 드롭다운 토글 함수
	    function toggleDropdown(event) {
	        event.stopPropagation();  // 클릭 이벤트가 상위로 전달되지 않도록
	        const dropdown = document.getElementById("userDropdown");
	        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
	    }

	    // 페이지의 다른 곳을 클릭했을 때 드롭다운을 닫는 기능
	    window.onclick = function(event) {
	        if (!event.target.matches('.user-icon')) {
	            const dropdown = document.getElementById("userDropdown");
	            if (dropdown.style.display === "block") {
	                dropdown.style.display = "none";
	            }
	        }
	    }
		let markers = [];
		
		// 지도 초기화 함수
		function initMap() {
		    const defaultLocation = { lat: 37.487564, lng: 126.821585 };
		    const map = new google.maps.Map(document.getElementById('map'), {
		        center: defaultLocation,
		        zoom: 15,
		        gestureHandling: 'none',
		        zoomControl: false,
		        draggable: false
		    });
		
		    const defaultMarker = new google.maps.Marker({
		        position: defaultLocation,
		        map: map,
		        icon: 'https://maps.google.com/mapfiles/kml/shapes/man.png',
		        title: "기본 위치"
		    });
		
		    const service = new google.maps.places.PlacesService(map);
		    service.nearbySearch({
		        location: defaultLocation,
		        radius: 1500,
		        type: ['restaurant'],
		    }, function(results, status) {
		        // 기존 마커 삭제
		        clearMarkers();
		
		        if (status === google.maps.places.PlacesServiceStatus.OK) {
		            for (let i = 0; i < results.length; i++) {
		                createMarker(results[i], map);
		            }
		        } else {
		            console.log("해당 음식을 파는 식당이 없습니다.");
		        }
		    });
		}
		
		// 모든 마커 삭제하는 함수
		function clearMarkers() {
		    for (let i = 0; i < markers.length; i++) {
		        markers[i].setMap(null);
		    }
		    markers = []; // 배열 초기화
		}
		
		// 검색 결과에 마커 추가하는 함수
		function createMarker(place, map) {
		    const marker = new google.maps.Marker({
		        map: map,
		        position: place.geometry.location,
		        title: place.name
		    });
		
		    markers.push(marker); // 배열에 마커 저장
		
		    google.maps.event.addListener(marker, 'click', function() {
		        const infowindow = new google.maps.InfoWindow({
		            content: `<h3>${place.name}</h3><p>${place.vicinity}</p>`
		        });
		        infowindow.open(map, marker);
		    });
		}
function showWeatherDetails() {
    document.querySelector('.weather-box').classList.add('expanded');
}

function hideWeatherDetails() {
    document.querySelector('.weather-box').classList.remove('expanded');
}

		