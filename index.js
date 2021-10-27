const imperial = 'imperial';
const celcius = 'metric';
let currentUnits = imperial;
let currentCity = 'san francisco';

const test = document.querySelector('.test');

// eslint-disable-next-line func-names
const display = (function () {
  const displayData = (data) => {
    test.textContent = Math.round(data.main.temp);
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
    display.displayData(weatherData);
  } catch (error) {
    alert("Sorry, we couldn't find that city");
  }
};

const formSubmit = async (event) => {
  event.preventDefault();
  let userInput = document.querySelector('#cityInput').value;
  currentCity = userInput;
  await getWeather(currentCity, currentUnits);
  userInput = '';
};

const changeUnits = () => {
  if (currentUnits === imperial) {
    currentUnits = celcius;
  } else {
    currentUnits = imperial;
  }
  getWeather(currentCity, currentUnits);
};

document.querySelector('.projectForm').addEventListener('submit', formSubmit);
document.querySelector('.changeUnits').addEventListener('click', changeUnits);

getWeather('san francisco', currentUnits);
