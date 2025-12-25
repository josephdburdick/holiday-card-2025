'use client'

import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Update progress bar as audio plays
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateProgress)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateProgress)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Audio playback failed:', error)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const progressWidth = rect.width
    const newTime = (clickX / progressWidth) * duration

    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="music-player mt-8 w-full max-w-xs">
      <audio
        ref={audioRef}
        src="/audio/christmas-mix.mp3" // Update this path when you add your audio file
        preload="metadata"
      />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mb-3"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {isPlaying ? (
            // Pause icon
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          ) : (
            // Play icon
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          )}
        </svg>
        {isPlaying ? 'Pause Mix' : 'Play My Mix 🎵'}
      </button>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-2 cursor-pointer" onClick={handleProgressClick}>
        <div
          className="bg-red-600 h-2 rounded-full transition-all duration-200"
          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Song title hint */}
      <p className="text-center text-xs text-gray-500 mt-2 italic">
        A special mix just for you 💕
      </p>
    </div>
  )
}
