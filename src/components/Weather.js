import { useEffect, useState, useRef } from "react";
import "./Weather.css";
import Axios from "axios";
import WeatherColumn from "./WeatherColumn";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [temperatureF, setTemperatureF] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setAPI] = useState(null);
  const [errMSG, seterrMSG] = useState("");
  const API_KEY = "7daf7fee8bd01cd592c6d91140650f0c";

  const inputHandler = (e) => setLocation(e.target.value);
  const clickHandler = () => {
    getWeather();
  };

  const getWeather = () => {
    if (location !== "") {
      Axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          location +
          "&appid=" +
          API_KEY +
          "&units=metric"
      )
        .then((response) => {
          setAPI(response.data);
          for (let i of response.data.weather) {
            setWeather(i.main);
            setWeatherDescription(i.description);
            setWeatherIcon(
              "http://openweathermap.org/img/w/" + i.icon + ".png"
            );
          }
          setTemperature(response.data.main.temp + "C");
          setTemperatureF(
            (response.data.main.temp * (9 / 5) + 32).toFixed(2) + "F"
          );
          seterrMSG(null);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.log(error);
          seterrMSG(
            "Something went wrong, please retype city in search field."
          );
          setLocation("");
          setWeather(null);
          setWeatherDescription(null);
          setWeatherIcon(null);
          setTemperature(null);
          setTemperatureF(null);
          setIsLoaded(false);
        });
    } else {
      seterrMSG("Search field cannot be empty.");
      setLocation("");
      setWeather(null);
      setWeatherDescription(null);
      setWeatherIcon(null);
      setTemperature(null);
      setTemperatureF(null);
      setIsLoaded(false);
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
      <button onClick={clickHandler}>→</button>
      <div className='weatherCol'>
        <h1>{location}</h1>
      </div>
      {isLoaded ? <img src={weatherIcon}></img> : null}
      <WeatherColumn
        props={{
          weather: weather,
          weatherDescription: weatherDescription,
          temperature: temperature,
          temperatureF: temperatureF,
          errMSG: errMSG,
        }}
      />
    </div>
  );
};

export default Weather;
