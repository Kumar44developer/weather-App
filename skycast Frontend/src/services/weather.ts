import api from './api'

export interface WeatherData {
  city: string
  temperature: number
  humidity: number
  wind: number
  description: string
}
