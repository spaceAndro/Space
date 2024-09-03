document.addEventListener("DOMContentLoaded", function() {
    // Geolocation and Weather API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const apiKey = 'vha3IgENJL6COJO7jqtWLrW7R4kbd0JRBboZV%2FnTk%2BACz6YJ6Of%2B6XcSMxLbOTl55N17l4jEz8X3KY6ymDrGTA%3D%3D'; // 기상청 API 키
            const baseDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
            const baseTime = String(new Date().getHours()).padStart(2, '0') + '00';
            const nx = Math.floor(lat); // 위도
            const ny = Math.floor(lon); // 경도

            const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${apiKey}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&dataType=JSON`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const weatherBox = document.querySelector('.weather-box');
                    const items = data.response.body.items.item;
                    let weatherInfo = '';

                    items.forEach(item => {
                        switch(item.category) {
                            case 'PTY':
                                weatherInfo += `<p>강수형태: ${getPrecipitationType(item.obsrValue)}</p>`;
                                break;
                            case 'REH':
                                weatherInfo += `<p>습도: ${item.obsrValue}%</p>`;
                                break;
                            case 'RN1':
                                weatherInfo += `<p>1시간 강수량: ${item.obsrValue}mm</p>`;
                                break;
                            case 'T1H':
                                weatherInfo += `<p>기온: ${item.obsrValue}°C</p>`;
                                break;
                            case 'UUU':
                                weatherInfo += `<p>동서바람성분: ${item.obsrValue}m/s</p>`;
                                break;
                            case 'VEC':
                                weatherInfo += `<p>풍향: ${item.obsrValue}°</p>`;
                                break;
                            case 'VVV':
                                weatherInfo += `<p>남북바람성분: ${item.obsrValue}m/s</p>`;
                                break;
                            case 'WSD':
                                weatherInfo += `<p>풍속: ${item.obsrValue}m/s</p>`;
                                break;
                        }
                    });

                    weatherBox.innerHTML = `<h2>현재 날씨</h2>${weatherInfo}`;
                })
                .catch(error => console.error('Error fetching weather data:', error));
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function getPrecipitationType(value) {
    switch(value) {
        case '0': return '없음';
        case '1': return '비';
        case '2': return '비/눈';
        case '3': return '눈';
        case '4': return '소나기';
        default: return '알 수 없음';
    }
}
