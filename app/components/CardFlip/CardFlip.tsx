"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import HTMLFlipBook from "react-pageflip"
import InsideMessage from "../InsideMessage/InsideMessage"
import MusicPlayer from "../MusicPlayer/MusicPlayer"

export default function CardFlip() {
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false)
  const flipBookRef = useRef<any>(null)

  const handleFlip = (e: any) => {
    // Track when the card has been opened at least once
    if (e.data > 0 && !hasOpenedOnce) {
      setHasOpenedOnce(true)
    }
  }

  return (
    <div className="card-container">
      <HTMLFlipBook
        width={400}
        height={550}
        size="stretch"
        minWidth={300}
        maxWidth={400}
        minHeight={420}
        maxHeight={550}
        startPage={0}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={handleFlip}
        drawShadow={true}
        flippingTime={600}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
        ref={flipBookRef}
        className="card-book"
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* Front Cover */}
        <div className="page page-cover">
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Image
              src="/img/xmas-card-cover-2025.png"
              alt="Christmas Card Cover"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle overlay for tap hint */}
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <span className="text-white/80 text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                Swipe or tap to open
              </span>
            </div>
          </div>
        </div>

        {/* Inside Page */}
        <div className="page page-inside inside-page">
          <InsideMessage />
          {hasOpenedOnce && <MusicPlayer />}
        </div>
      </HTMLFlipBook>
    </div>
  )
}
