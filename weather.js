const apiKey = "aBTWLEDG75wvgiswwa09owUU84jR9N45";

fetch(`https://api.tomorrow.io/v4/weather/realtime?location=30.2752,-98.8719&units=imperial&apikey=${apiKey}`)
  .then(res => res.json())
  .then(data => {

    console.log(data);

    const v = data.data.values;

    const temp = Math.round(v.temperature ?? 0);
    const rain = Math.round(v.precipitationProbability ?? 0);
    const humidity = Math.round(v.humidity ?? 0);
    const wind = Math.round(v.windSpeed ?? 0);

    document.getElementById("temp").innerText = temp + "°";
    document.getElementById("nowTemp").innerText = temp + "°";

    document.getElementById("rain").innerText = rain + "%";
    document.getElementById("rain2").innerText = rain + "%";

    document.getElementById("humidity").innerText = humidity + "%";
    document.getElementById("wind").innerText = wind + " mph";

    document.getElementById("feels").innerText =
      Math.round(v.temperatureApparent ?? temp) + "°";

    document.getElementById("gust").innerText =
      Math.round(v.windGust ?? wind) + " mph";

    document.getElementById("condition").innerText =
      getCondition(v.weatherCode);

  })
  .catch(err => {
    console.error(err);
  });

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
