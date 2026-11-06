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
