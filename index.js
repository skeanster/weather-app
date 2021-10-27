const imperial = 'imperial';
const test = document.querySelector('.test');

async function getWeather(city) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${imperial}&APPID=96517cb296bd62cd371f73c7fc1b036e`,
    { mode: 'cors' },
  );
  const weatherData = await response.json();
  test.textContent = weatherData.main.temp;
}

getWeather('san francisco');
