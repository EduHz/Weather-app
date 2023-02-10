import { useState, useEffect } from "react";
import Loading from "./loading";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";

import styles from "./weatherApp.module.css";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const REACT_APP_KEY = "c780496d19ec471d86f30040221304";
  const REACT_APP_URL = "http://api.weatherapi.com/v1/current.json?aqi=no";
  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = "Weather | " + weather?.location?.name ?? "";
  }, [weather]);

  async function loadInfo(city = "london") {
    console.log(
      `${REACT_APP_URL}&key=${REACT_APP_KEY}&q=${city}`
    );
    try {
      const request = await fetch(
        `${REACT_APP_URL}&key=${REACT_APP_KEY}&q=${city}`
      );
      const json = await request.json();
      console.log(json);

      setTimeout(() => {
        setWeather({ ...json });
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  }

  function handleOnChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleOnChangeCity} />
      {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
    </div>
  );
}
