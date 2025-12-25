export default function InsideMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
      {/* Decorative element */}
      <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mb-4"></div>

      {/* Message text */}
      <div className="message-text max-w-md">
        <p className="mb-4">
          Merry Christmas, my love! 🎄✨
        </p>
        <p className="mb-4">
          This year has been filled with so many wonderful moments together.
          From our adventures to the quiet evenings, every day with you is a gift.
        </p>
        <p>
          Wishing you joy, love, and all the happiness your heart can hold.
          Here's to many more magical moments in the year ahead.
        </p>
      </div>

      {/* Signature */}
      <div className="signature">
        With all my love,<br />
        [Your Name]
      </div>

      {/* Decorative element */}
      <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full mt-4"></div>
    </div>
  )
}
