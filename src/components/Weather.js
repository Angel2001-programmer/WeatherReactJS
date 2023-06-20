import { useEffect, useState } from "react";
import "./Weather.css";
const Weather = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [temperatureF, setTemperatureF] = useState("");

  const [data, setdata] = useState(null);
  const API_KEY = "6bc0cc514753cf1e36f040a0a5cf858b";

  const inputHandler = (e) => setLocation(e.target.value);

  const getData = async () => {
    if (location != "") {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          location +
          "&appid=" +
          API_KEY +
          "&units=metric"
      );

      setdata(await response.json());

      if (data != []) {
        setTemperature(data["main"]["temp"] + "C");
        setTemperatureF((data["main"]["temp"] * (9 / 5) + 32).toFixed(2) + "F");

        for (let i of data["weather"]) {
          setWeatherIcon(
            "http://openweathermap.org/img/w/" + i["icon"] + ".png"
          );
          setWeather(i["main"]);
          setWeatherDescription(i["description"]);
        }
      } else {
        return;
      }
    }
  };

  return (
    <div className='weatherContainer'>
      <input
        type='text'
        value={location}
        onChange={inputHandler}
        placeholder='Type your location here'
      />
      <button onClick={getData}>→</button>
      <div className='weatherCol'>
        <h1>{location}</h1>
        <img src={weatherIcon}></img>
        <div className='weatherCol'>
          <h3>{weather}</h3>
          <h3>{weatherDescription}</h3>
          <h3>{temperature}</h3>
          <h3>{temperatureF}</h3>
        </div>
      </div>
    </div>
  );
};

export default Weather;
