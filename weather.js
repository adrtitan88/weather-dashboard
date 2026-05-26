const apiKey = "aBTWLEDG75wvgiswwa09owUU84jR9N45";

async function loadWeather() {

  try {

    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=30.28659,-98.86847&timesteps=1h&units=imperial&apikey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    const current = data.timelines.hourly[0].values;

    const temp =
      Math.round(current.temperature ?? 0);

    const rain =
      Math.round(current.precipitationProbability ?? 0);

    const humidity =
      Math.round(current.humidity ?? 0);

    const wind =
      Math.round(current.windSpeed ?? 0);

    const feels =
      Math.round(current.temperatureApparent ?? temp);

    const gust =
      Math.round(current.windGust ?? wind);

    // MAIN TEMP
    document.getElementById("temp").innerText =
      `${temp}°`;

    // BOTTOM ROW
    document.getElementById("nowTemp").innerText =
      `${temp}°`;

    document.getElementById("rain").innerText =
      `${rain}%`;

    document.getElementById("rain2").innerText =
      `${rain}%`;

    document.getElementById("humidity").innerText =
      `${humidity}%`;

    document.getElementById("wind").innerText =
      `${wind} mph`;

    document.getElementById("feels").innerText =
      `${feels}°`;

    document.getElementById("gust").innerText =
      `${gust} mph`;

    // CONDITION TEXT
    document.getElementById("condition").innerText =
      getCondition(current.weatherCode);

  } catch (err) {

    console.error(err);

    document.getElementById("condition").innerText =
      "Weather unavailable";

  }
}

function getCondition(code) {

  const map = {

    1000: "Clear",
    1001: "Cloudy",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",

    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",

    5000: "Snow",

    8000: "Thunderstorm"

  };

  return map[code] || "Current Weather";
}

// INITIAL LOAD
loadWeather();

// AUTO REFRESH EVERY 10 MINUTES
setInterval(loadWeather, 600000);
