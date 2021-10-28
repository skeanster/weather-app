const imperial = 'imperial';
const celcius = 'metric';
let currentUnits = imperial;
const defaultCity = 'San Francisco';
let currentCity = defaultCity;

// eslint-disable-next-line func-names
const display = (function () {
  const description = document.querySelector('.weatherDescription');
  const humidity = document.querySelector('.humidity');
  const min = document.querySelector('.min');
  const max = document.querySelector('.max');

  const temp = document.querySelector('.temp');
  const cityName = document.querySelector('.cityName');

  const displayData = (data) => {
    temp.textContent = `°${Math.round(data.main.temp)}`;
    cityName.textContent = data.name;

    description.textContent = data.weather[0].main;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    min.textContent = `Min: °${Math.round(data.main.temp_min)}`;
    max.textContent = `Max: °${Math.round(data.main.temp_max)}`;
    currentCity = data.name;
  };

  return { displayData };
}());

const getWeather = async (city, units) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=96517cb296bd62cd371f73c7fc1b036e`,
      { mode: 'cors' },
    );
    const weatherData = await response.json();
    console.log(weatherData);
    display.displayData(weatherData);
  } catch (error) {
    alert("Sorry, we couldn't find that city");
  }
};

const formSubmit = (event) => {
  event.preventDefault();
  const userInput = document.querySelector('#cityInput').value;
  getWeather(userInput, currentUnits);
  document.querySelector('#cityInput').value = '';
};

const changeUnits = () => {
  const label = document.querySelector('.unitsLabel');

  if (currentUnits === imperial) {
    currentUnits = celcius;
    label.textContent = 'C';
  } else {
    currentUnits = imperial;
    label.textContent = 'F';
  }
  getWeather(currentCity, currentUnits);
};

document.querySelector('.searchForm').addEventListener('submit', formSubmit);
document.querySelector('.changeUnits').addEventListener('click', changeUnits);

getWeather(defaultCity, currentUnits);
