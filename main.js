const tempField = document.querySelector(".temp p");
const locationField = document.querySelector(".location");
const timeField = document.querySelector(".time");
const conditionField = document.querySelector(".condition-type");
const iconField = document.querySelector(".icon");
const searchField = document.querySelector(".search");
const suggestionsBox = document.querySelector(".suggestions");
const form = document.querySelector("form");

const API_KEY = "a099bae8e59242cba8c123031252109";

// Fetch weather for a city
async function fetchWeather(city) {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );
    const data = await res.json();

    tempField.innerText = data.current.temp_c;
    locationField.innerText = `${data.location.name}, ${data.location.country}`;
    timeField.innerText = data.location.localtime;
    conditionField.innerText = data.current.condition.text;
    iconField.src = "https:" + data.current.condition.icon;
  } catch (err) {
    console.error("Error fetching weather:", err);
    locationField.innerText = "Location not found";
    tempField.innerText = "--";
    timeField.innerText = "";
    conditionField.innerText = "";
    iconField.src = "";
  }
}

// Fetch suggestions for autocomplete
async function fetchSuggestions(query) {
  if (!query) return (suggestionsBox.innerHTML = "");

  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
    );
    const results = await res.json();

    suggestionsBox.innerHTML = results
      .map(
        (place) => `<div class="suggestion-item" data-name="${place.name}">
        ${place.name}, ${place.country}
      </div>`
      )
      .join("");

    // Click on suggestion
    document.querySelectorAll(".suggestion-item").forEach((item) => {
      item.addEventListener("click", () => {
        searchField.value = item.dataset.name;
        suggestionsBox.innerHTML = "";
        fetchWeather(item.dataset.name);
      });
    });
  } catch (err) {
    console.error("Error fetching suggestions:", err);
  }
}

// Event listeners
searchField.addEventListener("input", (e) => fetchSuggestions(e.target.value));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeather(searchField.value);
});

// Initial weather
fetchWeather("Kathmandu");
