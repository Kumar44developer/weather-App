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


export default function Dashboard() {
  const [question, setQuestion] = useState('')
  const [selectedCity, setSelectedCity] = useState('New York')
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
