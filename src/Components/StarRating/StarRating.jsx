import React from 'react'
import './StarRating.css'

export default function StarRating({rating}) {

  return (
    <div className="stars">
        {
            [1,2,3,4,5].map(star =>(
                <span
                    key={star}
                    className={star <= rating ? 'star filled' : 'star'}
                    >
                    ★
                </span>
            ))
        }
    </div>
  )
}
