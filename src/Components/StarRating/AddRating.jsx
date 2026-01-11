import React from 'react'
import './StarRating.css'

export default function AddRating({ rating, setRating }) {
  return (
    <div className="starsadd">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'star filled' : 'staradd '}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  )
}
