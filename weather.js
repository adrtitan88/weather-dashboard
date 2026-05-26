const apiKey = "aBTWLEDG75wvgiswwa09owUU84jR9N45";

fetch(`https://api.tomorrow.io/v4/weather/realtime?location=30.2752,-98.8719&apikey=${apiKey}`)
.then(res => res.json())
.then(data => {

  const values = data.data.values;

  document.getElementById("temp").innerText =
    Math.round(values.temperature) + "°";

  document.getElementById("rain").innerText =
    Math.round(values.precipitationProbability) + "%";

  document.getElementById("humidity").innerText =
    Math.round(values.humidity) + "%";

  document.getElementById("wind").innerText =
    Math.round(values.windSpeed) + " mph";

  document.getElementById("condition").innerText =
    "Current Weather";
});
