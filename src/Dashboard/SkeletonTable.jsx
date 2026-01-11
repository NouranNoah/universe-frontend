import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonTable({ rows = 5, columns = 3 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex}>
              {colIndex === 0 ? (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Skeleton height={30} width={30} circle />
                  <Skeleton height={25} width={200} />
                </div>
              ) : (
                <Skeleton height={25} width={100} />
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
