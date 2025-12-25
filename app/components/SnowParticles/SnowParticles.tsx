"use client"

import Snowfall from "react-snowfall"

export default function SnowParticles() {
  return (
    <Snowfall
      snowflakeCount={100}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 20,
        pointerEvents: "none",
      }}
    />
  )
}
