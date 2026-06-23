export interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Rain {
  "1h"?: number;
  "3h"?: number;
}

export interface Snow {
  "1h"?: number;
  "3h"?: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface CurrentWeather {
  coord: Coord;
  weather: WeatherInfo[]; // There is a file called Weather.tsx
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain?: Rain;
  snow?: Snow;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastMain extends Main {
  temp_kf: number;
}

export interface ForecastItem {
  dt: number;
  main: ForecastMain;
  weather: WeatherInfo[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  snow?: Snow;
  sys: { pod: string };
  dt_txt: string;
}

export interface ForecastCity {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: ForecastCity;
}
