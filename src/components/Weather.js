import { useState } from "react";
import "./Weather.css";
const Weather = () => {
  const [location, setLocation] = useState("Location");
  const [weather, setWeather] = useState("Weather");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [temperatureC, setTemperatureC] = useState(0);
  const [temperatureF, setTemperatureF] = useState(0);
  const [data, setdata] = useState(null);

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      setLocation(e.target.value);
      getData();
      e.target.value = null;
    }
  };

  const getData = () => {
    if (location != null) {
      fetch(
        "https://api.weatherapi.com/v1/forecast.json?key=573ced0133c744eb9a1142555230506&q=" +
          location
      )
        .then((response) => response.json())
        .then((json) => setdata(json))
        .catch((error) => console.error(error));
    }

    if (data != null) {
      setTemperatureC(data["current"]["temp_c"]);
      setTemperatureF(data["current"]["temp_f"]);
      setWeather(data["current"]["condition"]["text"]);
      setWeatherIcon(data["current"]["condition"]["icon"]);
    }
  };

  return (
    <div className='weatherContainer'>
      <input
        type='search'
        placeholder='Type your location here'
        onKeyDown={enterHandler}
      />
      <div className='weatherCol'>
        <h1>{location}</h1>
        <div className='weatherCol'>
          <img src={weatherIcon}></img>
          <h3>{weather}</h3>
          <h3>{temperatureC}C</h3>
          <h3>{temperatureF}F</h3>
        </div>
      </div>
    </div>
  );
};

export default Weather;
