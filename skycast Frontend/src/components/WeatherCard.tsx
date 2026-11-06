import { useEffect } from 'react'
import { useWeather } from '../contexts/WeatherContext'

interface WeatherCardProps {
  city: string
  temperature: number
  weather: string
