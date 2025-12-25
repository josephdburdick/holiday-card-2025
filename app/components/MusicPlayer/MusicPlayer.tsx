"use client"

import { useState, useRef, useEffect } from "react"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
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

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      setIsLoading(false)
      setError(null)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
      setError(null)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
      setError(null)
    }

    const handleError = (e: Event) => {
      const audioError = audio.error
      let errorMessage = "Unable to load audio"

      if (audioError) {
        switch (audioError.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = "Audio loading was aborted"
            break
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = "Network error while loading audio"
            break
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = "Audio decoding error"
            break
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = "Audio format not supported"
            break
        }
      }

      console.error("Audio error:", e, audioError)
      setError(errorMessage)
      setIsPlaying(false)
      setIsLoading(false)
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    // Try to load the audio
    try {
      audio.load()
    } catch (err) {
      console.error("Failed to load audio:", err)
      setError("Failed to load audio file")
      setIsLoading(false)
    }

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
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
      console.error("Audio playback failed:", error)
      setIsPlaying(false)
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

  const handleDownload = () => {
    try {
      const link = document.createElement("a")
      link.href = "/audio/KateXmas2025mix.m4a"
      link.download = "KateXmas2025mix.m4a"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Download failed:", err)
      setError("Download failed. Please try again.")
    }
  }

  const handleProgressKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = rect.width / 2 // Center of progress bar
      const progressWidth = rect.width
      const newTime = (clickX / progressWidth) * duration

      const audio = audioRef.current
      if (audio) {
        audio.currentTime = newTime
        setCurrentTime(newTime)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="music-player mt-8 w-full max-w-sm">
      <audio
        ref={audioRef}
        src="/audio/KateXmas2025mix.m4a"
        preload="metadata"
      />

      {/* Sleek Card Container */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-5 space-y-4">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">
            A special DJ mix just for you
          </p>
          {error && (
            <p className="text-xs text-red-600 mt-2" role="alert">
              {error}
            </p>
          )}
          {isLoading && !error && (
            <p className="text-xs text-gray-500 mt-2" aria-live="polite">
              Loading...
            </p>
          )}
        </div>

        {/* Controls Row */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            disabled={!!error || isLoading}
            className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-full transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:hover:scale-100"
            aria-label={isPlaying ? "Pause music" : "Play music"}
            aria-disabled={!!error || isLoading}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              {isPlaying ? (
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>

          {/* Progress Section */}
          <div className="flex-1 min-w-0">
            {/* Progress Bar */}
            <div
              className="bg-gray-200 rounded-full h-1.5 cursor-pointer hover:h-2 transition-all duration-200 group"
              onClick={handleProgressClick}
              onKeyDown={handleProgressKeyDown}
              role="slider"
              tabIndex={0}
              aria-label="Audio progress"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
              aria-valuetext={`${formatTime(currentTime)} of ${formatTime(
                duration
              )}`}
            >
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-600 h-full rounded-full transition-all duration-200 relative"
                style={{
                  width: `${
                    duration > 0 ? (currentTime / duration) * 100 : 0
                  }%`,
                }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Time Display */}
            <div className="flex justify-between text-xs text-gray-500 mt-1.5">
              <span className="font-medium">{formatTime(currentTime)}</span>
              <span className="font-medium">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex-shrink-0 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
            aria-label="Download audio"
            title="Download mix"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
