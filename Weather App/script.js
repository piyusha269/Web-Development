const apiKey = "9b4b3e64298ead9867a289fd824553be"; // Replace with your key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const weatherDisplay = document.getElementById("weatherDisplay");

const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");

// Load last searched city
window.onload = () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) fetchWeather(lastCity);
};

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  showLoading(true);
  errorEl.classList.add("hidden");
  weatherDisplay.classList.add("hidden");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    renderWeather(data);

    // Save last city
    localStorage.setItem("lastCity", city);
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.classList.remove("hidden");
  } finally {
    showLoading(false);
  }
}

function renderWeather(data) {
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = `🌡 Temperature: ${data.main.temp}°C`;
  conditionEl.textContent = `🌥 Condition: ${data.weather[0].main}`;
  humidityEl.textContent = `💧 Humidity: ${data.main.humidity}%`;

  weatherDisplay.classList.remove("hidden");
}

function showLoading(isLoading) {
  loadingEl.classList.toggle("hidden", !isLoading);
}
