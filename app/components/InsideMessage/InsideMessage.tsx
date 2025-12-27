export default function InsideMessage() {
  return (
    <div className="flex flex-col items-center h-full  w-full">
      {/* Decorative element */}
      {/* <div className="decorative-divider mb-6"></div> */}

      {/* Message text */}
      <div className="space-y-4 [&_p]:text-left flex flex-col flex-1 font-montserrat text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 font-normal tracking-wide max-w-[85%] sm:max-w-[420px] relative z-10 min-h-0">
        <p className="md:text-2xl md:pt-4">
          Merry Christmas, Kate! <span className="text-2xl">🎄✨</span>
        </p>
        <p>
          We made it through another year and somehow feel even closer than
          before. This one was full of twists and turns, but it was our best yet
          and I'm looking forward to future adventures together.
        </p>
        <p>
          Wishing you joy, love, and all the happiness your heart can hold.
          Here's to many more magical moments for us in the year ahead.
        </p>
      </div>

      {/* Signature */}
      <div className="font-great-vibes text-xl w-full text-pink-600 mt-6 leading-tight relative z-10 font-normal tracking-wide">
        With all my love,
        <br />
        <span className="text-black">Joe</span>{" "}
        <span className="text-xl text-gray-400 mt-0.5">💕</span>
      </div>

      {/* Decorative element */}
      <div className="relative flex justify-center w-full decorative-divider mt-6 mx-auto"></div>
    </div>
  )
}
