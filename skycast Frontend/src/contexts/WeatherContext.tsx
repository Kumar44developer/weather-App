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

    if (weatherLower.includes('storm') || weatherLower.includes('thunder')) {
      return 'storm'
    } else if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
      return 'rain'
    } else if (weatherLower.includes('cloud') || weatherLower.includes('overcast')) {
      return 'cloudy'
    } else if (weatherLower.includes('sun') || weatherLower.includes('clear')) {
      return 'sunny'
    }

    return 'sunny'
  }


  return (
    <WeatherContext.Provider value={{ weatherType, setWeatherType, getWeatherTypeFromString }}>
      {children}
    </WeatherContext.Provider>
  )
}
