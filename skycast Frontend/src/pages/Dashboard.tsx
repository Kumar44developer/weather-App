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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return


    setAiLoading(true)
    setAiResponse(null)

    try {
      const response = await weatherService.askAI({
        city: selectedCity,
        question: question.trim(),
      })
      setAiResponse(response.advice)
      setQuestion('') // Clear input after successful submit
      showSuccess('AI response received!')
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Failed to get AI response. Please try again.'
      showError(errorMessage)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="py-4 sm:py-6 space-y-6 sm:space-y-8 animate-fade-in">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg animate-slide-in-left">
        Dashboard
      </h1>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {weatherData.map((cityWeather, index) => {
          if (cityWeather.loading) {
            return (
              <div
                key={cityWeather.city}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center min-h-[200px] gap-3 animate-pulse"
              >
