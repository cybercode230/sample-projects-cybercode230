// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// interface WeatherData {
//   name: string;
//   main: {
//     temp: number;
//     feels_like: number;
//     temp_min: number;
//     temp_max: number;
//     pressure: number;
//     humidity: number;
//   };
//   weather: {
//     description: string;
//     main: string;
//     icon: string;
//   }[];
// }

// const api_key = process.env.OPEN_WEATHER_API_KEY || "68ecf22f723d3ca5927134601a74b9f4";

// const CountryWeatherPage = () => {
//   const { country } = useParams<{ country: string }>();
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api_key}&units=metric`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch weather data");
//         }
//         const data: WeatherData = await response.json();
//         setWeather(data);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching weather:", err);
//         setError(err instanceof Error ? err.message : "Unknown error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (country) {
//       fetchWeather();
//     }
//   }, [country]);

//   if (loading) return <div>Loading weather data...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!weather) return <div>No weather data found.</div>;

//   return (
//     <div className="p-4">
//       <h1>{weather.name} Weather</h1>
//       <p>🌡️ Temperature: {weather.main.temp}°C</p>
//       <p>🌤️ Condition: {weather.weather[0].description}</p>
//     </div>
//   );
// };

// export default CountryWeatherPage;


"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

const CountryWeatherPage = () => {
  const { country } = useParams<{ country: string }>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api_key}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data: WeatherData = await response.json();
        setWeather(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (country) {
      fetchWeather();
    }
  }, [country]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        Loading weather data...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-400">
        Error: {error}
      </div>
    );

  if (!weather)
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        No weather data found.
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 text-white rounded-3xl p-6 shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">{weather.name}</h1>
        <div className="flex justify-center mb-4">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].main}
            className="w-24 h-24"
          />
        </div>
        <p className="text-xl text-center font-semibold">
          🌡️ {weather.main.temp}°C — {weather.weather[0].description}
        </p>
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-white/80">
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Min Temp: {weather.main.temp_min}°C</p>
          <p>Max Temp: {weather.main.temp_max}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default CountryWeatherPage;
