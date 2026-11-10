import { createContext, useContext, useState, ReactNode } from 'react'


type WeatherType = 'sunny' | 'rain' | 'cloudy' | 'storm' | null

interface WeatherContextType {
  weatherType: WeatherType
  setWeatherType: (type: WeatherType) => void
  getWeatherTypeFromString: (weather: string) => WeatherType
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weatherType, setWeatherType] = useState<WeatherType>(null)

  const getWeatherTypeFromString = (weather: string): WeatherType => {
    const weatherLower = weather.toLowerCase()
