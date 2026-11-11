import { type FormEvent, useState, useEffect } from 'react'
import WeatherCard from '../components/WeatherCard'
import { weatherService, type WeatherData } from '../services/weather'
import { useToast } from '../contexts/ToastContext'

interface CityWeather {
  city: string
  data: WeatherData | null
  loading: boolean
  error: string | null
}
