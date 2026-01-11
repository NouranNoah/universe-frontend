import React from 'react';
import './SkeletonOverviewCard.css';

export default function SkeletonOverviewCard() {
  return (
    <div className="Total-box skeleton">
      <div className="skeleton-left">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line number"></div>
        <div className="skeleton-line small"></div>
      </div>
      <div className="skeleton-icon"></div>
    </div>
  );
}
