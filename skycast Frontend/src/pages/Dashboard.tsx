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
  const [cities] = useState(['New York', 'London', 'Tokyo'])
  const [weatherData, setWeatherData] = useState<CityWeather[]>(
    cities.map((city) => ({ city, data: null, loading: true, error: null }))
  )
  const { success: showSuccess, error: showError, info: showInfo } = useToast()

  useEffect(() => {
    const fetchWeatherData = async () => {
      showInfo('Loading weather data...')
      const promises = cities.map(async (city) => {
        try {
          const data = await weatherService.getWeather(city)
          return { city, data, loading: false, error: null }
        } catch (error: any) {
          const errorMessage = error.response?.data?.detail || 'Failed to fetch weather'
          showError(`Failed to load weather for ${city}: ${errorMessage}`)
          return {
            city,
            data: null,
            loading: false,
            error: errorMessage,
          }
        }
      })

      const results = await Promise.all(promises)
      setWeatherData(results)
      const successCount = results.filter((r) => r.data).length
      if (successCount > 0) {
        showSuccess(`Loaded weather for ${successCount} city${successCount > 1 ? 'ies' : ''}`)
      }
    }

    fetchWeatherData()
  }, [cities, showSuccess, showError, showInfo])
