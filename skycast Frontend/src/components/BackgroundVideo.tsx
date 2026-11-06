import { useEffect, useState } from 'react'
import { useWeather } from '../contexts/WeatherContext'

const videoSources = {
  sunny: '/videos/sunny.mp4', // Replace with your sunny video URL
  rain: '/videos/rain.mp4',
  cloudy: '/videos/cloudy.mp4', // Replace with your cloudy video URL
  storm: '/videos/storm.mp4', // Replace with your storm video URL
}

const fallbackVideos = {
  sunny: 'https://videos.pexels.com/video-files/2491284/2491284-hd_1920_1080_30fps.mp4', // Sunny sky
  rain: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4', // Rain
  cloudy: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4', // Cloudy
  storm: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4', // Storm
}
