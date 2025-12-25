"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import InsideMessage from "../InsideMessage/InsideMessage"
import MusicPlayer from "../MusicPlayer/MusicPlayer"

export default function CardFlip() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 400, height: 550 })
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference and handle mounting
  useEffect(() => {
    setIsMounted(true)
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Responsive sizing based on window size
  useEffect(() => {
    if (!isMounted) return

    const updateDimensions = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const isDesktop = viewportWidth > 768

      // Card aspect ratio (standard greeting card ratio)
      const aspectRatio = 5 / 7 // Width / Height

      // On desktop, use responsive width range between 500-600px
      if (isDesktop) {
        let desktopWidth

        // For viewport widths >= 1200px, use fixed 600px width
        if (viewportWidth >= 1200) {
          desktopWidth = 600
        }
        // For viewport widths between 769px and 1200px, interpolate from 500px to 600px
        else if (viewportWidth > 769) {
          const ratio = (viewportWidth - 769) / (1200 - 769)
          desktopWidth = 500 + ratio * (600 - 500)
        }
        // Fallback (shouldn't reach here since isDesktop is viewportWidth > 768)
        else {
          desktopWidth = 500
        }

        const desktopHeight = desktopWidth / aspectRatio

        setDimensions({
          width: Math.round(desktopWidth),
          height: Math.round(desktopHeight),
        })
        return
      }

      // Mobile/Tablet: Calculate available space with responsive padding
      let horizontalPadding, verticalPadding

      if (viewportWidth <= 480) {
        horizontalPadding = viewportWidth * 0.04 // 4% on mobile
        verticalPadding = viewportHeight * 0.05 // 5% on mobile
      } else {
        horizontalPadding = viewportWidth * 0.06 // 6% on tablet
        verticalPadding = viewportHeight * 0.08 // 8% on tablet
      }

      const availableWidth = viewportWidth - horizontalPadding * 2
      const availableHeight = viewportHeight - verticalPadding * 2

      // Calculate card dimensions to fill available space
      let cardWidth, cardHeight

      // Try fitting by height first
      cardHeight = availableHeight
      cardWidth = cardHeight * aspectRatio

      // If too wide, fit by width instead
      if (cardWidth > availableWidth) {
        cardWidth = availableWidth
        cardHeight = cardWidth / aspectRatio
      }

      // Apply responsive size limits
      const minWidth = viewportWidth <= 480 ? 260 : 300
      const maxWidth = viewportWidth <= 480 ? 380 : 480
      const minHeight = minWidth / aspectRatio
      const maxHeight = maxWidth / aspectRatio

      // Clamp dimensions
      cardWidth = Math.max(minWidth, Math.min(maxWidth, cardWidth))
      cardHeight = Math.max(minHeight, Math.min(maxHeight, cardHeight))

      // Final check - ensure it fits with some breathing room
      const finalAvailableWidth = viewportWidth - horizontalPadding * 2
      const finalAvailableHeight = viewportHeight - verticalPadding * 2

      if (cardWidth > finalAvailableWidth) {
        cardWidth = finalAvailableWidth
        cardHeight = cardWidth / aspectRatio
      }

      if (cardHeight > finalAvailableHeight) {
        cardHeight = finalAvailableHeight
        cardWidth = cardHeight * aspectRatio
      }

      setDimensions({
        width: Math.round(cardWidth),
        height: Math.round(cardHeight),
      })
    }

    // Initial calculation
    updateDimensions()

    // Update on resize with debounce
    let timeoutId: NodeJS.Timeout
    const debouncedUpdate = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateDimensions, 100)
    }

    window.addEventListener("resize", debouncedUpdate)
    return () => {
      window.removeEventListener("resize", debouncedUpdate)
      clearTimeout(timeoutId)
    }
  }, [isMounted])

  // Keyboard navigation support
  useEffect(() => {
    if (!isMounted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow Escape to close the card
      if (e.key === "Escape" && isFlipped) {
        setIsFlipped(false)
      }
      // Allow Enter/Space to open the card when closed
      if ((e.key === "Enter" || e.key === " ") && !isFlipped) {
        e.preventDefault()
        if (!hasOpenedOnce) {
          setHasOpenedOnce(true)
        }
        setIsFlipped(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFlipped, hasOpenedOnce, isMounted])

  const handleCardClick = () => {
    // Only allow clicking to flip when card is closed
    if (!isFlipped) {
      if (!hasOpenedOnce) {
        setHasOpenedOnce(true)
      }
      setIsFlipped(true)
    }
  }

  const handleBackClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    setIsFlipped(false)
  }

  return (
    <>
      {/* Back Button - Outside the card */}
      <button
        onClick={handleBackClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleBackClick(e as any)
          }
        }}
        className={`absolute top-4 left-4 z-20 w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 border border-gray-200 ${
          isFlipped
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-label="Close card"
        title="Close card"
        tabIndex={isFlipped ? 0 : -1}
      >
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div className="card-container z-10">
        <div
          className={`card-wrapper ${isFlipped ? "flipped" : ""} ${
            !isFlipped ? "cursor-pointer" : ""
          }`}
          onClick={handleCardClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleCardClick()
            }
          }}
          role={!isFlipped ? "button" : undefined}
          tabIndex={!isFlipped ? 0 : -1}
          aria-label={!isFlipped ? "Open Christmas card" : undefined}
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          }}
        >
          <div
            className="card-inner"
            style={prefersReducedMotion ? { transition: "none" } : undefined}
          >
            {/* Front Cover */}
            <div className="card-front">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="img/xmas-card-cover-2025.png"
                  alt="Christmas Card Cover"
                  fill
                  className="object-cover"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  priority
                  sizes="(max-width: 480px) 380px, (max-width: 768px) 480px, 600px"
                />
              </div>
            </div>

            {/* Back (Inside Page) */}
            <div className="card-back">
              <div className="bg-gradient-to-b from-white via-[#fdfbf9] to-[#faf8f5] rounded-[clamp(12px,1.5vw,20px)] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-start items-center text-center w-full h-full relative overflow-y-auto shadow-[inset_4px_0_16px_rgba(0,0,0,0.08),inset_0_4px_24px_rgba(0,0,0,0.06)]">
                {/* Paper texture overlay */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.015)_2px,rgba(0,0,0,0.015)_4px)] opacity-30 pointer-events-none"></div>

                <InsideMessage />
                {hasOpenedOnce && <MusicPlayer />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
