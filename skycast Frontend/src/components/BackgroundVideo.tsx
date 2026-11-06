import { useEffect, useState } from 'react'
import { useWeather } from '../contexts/WeatherContext'

const videoSources = {
  sunny: '/videos/sunny.mp4', // Replace with your sunny video URL
  rain: '/videos/rain.mp4',
