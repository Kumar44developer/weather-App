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

export interface AIWeatherResponse {
  advice: string
}

export const weatherService = {
  async getWeather(city: string): Promise<WeatherData> {
    const response = await api.get<WeatherData>('/weather', {
      params: { city },
    })
    return response.data
  },

  async askAI(request: AIWeatherRequest): Promise<AIWeatherResponse> {
    const response = await api.post<AIWeatherResponse>('/ai-weather', request)
    return response.data
  },
}
