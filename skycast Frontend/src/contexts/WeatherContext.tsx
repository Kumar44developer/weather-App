import { createContext, useContext, useState, ReactNode } from 'react'


type WeatherType = 'sunny' | 'rain' | 'cloudy' | 'storm' | null

interface WeatherContextType {
  weatherType: WeatherType
  setWeatherType: (type: WeatherType) => void
  getWeatherTypeFromString: (weather: string) => WeatherType
}
