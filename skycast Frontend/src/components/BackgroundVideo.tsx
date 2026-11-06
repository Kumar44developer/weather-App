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

export default function BackgroundVideo() {
  const { weatherType } = useWeather()
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (!weatherType) {
      setCurrentVideo(null)
      return
    }

    setFade(true)

    const timer = setTimeout(() => {
      // Try local video first, fallback to placeholder
      // You can modify this logic to prefer one source over another
      const videoSrc = videoSources[weatherType] || fallbackVideos[weatherType]
      setCurrentVideo(videoSrc)
      setFade(false)
    }, 300)


    return () => clearTimeout(timer)
  }, [weatherType])

  const handleVideoError = () => {
    if (!weatherType) return

    
    console.warn(`Video failed to load for weather type: ${weatherType}`)
    // Try fallback if current video fails
    const fallbackSrc = fallbackVideos[weatherType]
