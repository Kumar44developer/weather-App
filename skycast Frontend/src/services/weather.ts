import api from './api'

export interface WeatherData {
  city: string
  temperature: number
  humidity: number
  wind: number
  description: string
}


export interface AIWeatherRequest {
  city: string
  question: string
}
