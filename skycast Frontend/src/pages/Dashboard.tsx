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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <div className="text-gray-500 text-sm">Loading weather...</div>
              </div>
            )
          }

          if (cityWeather.error || !cityWeather.data) {
            return (
              <div
                key={cityWeather.city}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 animate-shake"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{cityWeather.city}</h2>
                <p className="text-red-600 text-sm">{cityWeather.error || 'No data available'}</p>
              </div>
            )
          }

          return (
            <div
              key={cityWeather.city}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <WeatherCard
                city={cityWeather.data.city}
                temperature={Math.round(cityWeather.data.temperature)}
                weather={cityWeather.data.description}
                humidity={cityWeather.data.humidity}
                wind={Math.round(cityWeather.data.wind)}
                isPrimary={index === 0}
              />
            </div>
          )
        })}
      </div>

      {/* Ask Weather AI chat input */}
      <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 drop-shadow">
          Ask Weather AI
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 hover:bg-white/90 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm bg-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about today's weather, forecast, or what to wear..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm bg-white/90 backdrop-blur-sm transition-all duration-200 disabled:opacity-50"
              disabled={aiLoading}
            />
            <button
              type="submit"
              disabled={aiLoading || !question.trim()}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >

              {aiLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Asking...
                </>
              ) : (
                'Ask Weather AI'
              )}
            </button>
          </div>

          {/* AI Response Display */}
          {aiLoading && (
            <div className="mt-3 p-4 bg-blue-50/90 backdrop-blur-sm border border-blue-200 rounded-lg animate-fade-in">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                <span className="text-blue-700 text-sm">Getting AI advice...</span>
              </div>
            </div>
          )}

          {aiResponse && !aiLoading && (
            <div className="mt-3 p-4 bg-green-50/90 backdrop-blur-sm border border-green-200 rounded-lg animate-fade-in-up">
              <h3 className="text-sm font-semibold text-green-900 mb-2">AI Advice:</h3>
              <p className="text-green-800 text-sm whitespace-pre-wrap leading-relaxed">{aiResponse}</p>
            </div>
          )}
