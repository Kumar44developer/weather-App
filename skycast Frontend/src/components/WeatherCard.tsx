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
    } else if (weatherLower.includes('snow')) {
      return '❄️'
    } else if (weatherLower.includes('fog') || weatherLower.includes('mist')) {
      return '🌫️'
    }
    return '🌤️'
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 hover:shadow-2xl hover:scale-[1.02] hover:bg-white/90 transition-all duration-300 ease-out animate-fade-in">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
         <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{city}</h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base truncate">{weather}</p>
        </div>
        <div className="text-3xl sm:text-5xl ml-2 animate-bounce-subtle">{getWeatherIcon()}</div>
      </div>
