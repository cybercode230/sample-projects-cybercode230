"use client"

import React, { useEffect, useState } from "react";

interface WeatherData {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: {
      description: string;
      main: string;
      icon: string;
    }[];
  }
  
const api_key = process.env.OPEN_WEATHER_API_KEY || "68ecf22f723d3ca5927134601a74b9f4";
const city = "kampala";
const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

const page = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchWeatherApi = async () => {
          try {
              setLoading(true);
        const response = await fetch(api_url)
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const weatherData: WeatherData = await response.json();
        setWeather(weatherData);
        setError(null);
        console.log(weatherData);
    } catch (err) {
        console.error("Error fetching weather:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch weather data");
    }finally{
        setLoading(false)
    }
};
fetchWeatherApi();
  }, []);

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return <div>No weather data available</div>;

  return (
    <>
    <div className="p-1 m-0">
      <h4>This is the weather api suggestion</h4>
      <h1>{weather.name} Weather</h1>
      <p>🌡️ Temperature: {weather.main.temp}°C</p>
      <p>🌤️ Condition: {weather.weather[0].description}</p>
    </div>
    </>
  );
};

export default page;
