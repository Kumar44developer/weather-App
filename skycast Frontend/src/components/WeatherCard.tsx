import { useEffect } from 'react'
import { useWeather } from '../contexts/WeatherContext'

interface WeatherCardProps {
  city: string
  temperature: number
  weather: string
  icon?: string
  humidity: number
  wind: number
  isPrimary?: boolean // If true, this card's weather will control the background
}


export default function WeatherCard({
  city,
  temperature,
  weather,
  icon,
  humidity,
  wind,
  isPrimary = false,
}: WeatherCardProps) {
  const { setWeatherType, getWeatherTypeFromString } = useWeather()

  useEffect(() => {
    if (isPrimary) {
      const weatherType = getWeatherTypeFromString(weather)
      setWeatherType(weatherType)
    }
  }, [weather, isPrimary, setWeatherType, getWeatherTypeFromString])
  // Default icon based on weather condition if not provided
  const getWeatherIcon = () => {
    if (icon) return icon

    const weatherLower = weather.toLowerCase()
    if (weatherLower.includes('sun') || weatherLower.includes('clear')) {
      return '☀️'
    } else if (weatherLower.includes('cloud')) {
      return '☁️'
    } else if (weatherLower.includes('rain')) {
      return '🌧️'
    } else if (weatherLower.includes('storm') || weatherLower.includes('thunder')) {
      return '⛈️'
