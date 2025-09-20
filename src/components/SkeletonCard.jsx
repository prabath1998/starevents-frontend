import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="h-full flex flex-col bg-gray-900 border-2 border-gray-700 rounded-2xl shadow-lg animate-pulse overflow-hidden">
      <div className="w-full h-48 bg-gray-700"></div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-6 bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}