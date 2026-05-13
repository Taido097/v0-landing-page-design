'use client';

import Image from 'next/image';
import { useState } from 'react';
import { WebsitePreviewModal } from './website-preview-modal';

interface LaptopMockupProps {
  image: string;
  alt: string;
  projectTitle: string;
}

export function LaptopMockup({ image, alt, projectTitle }: LaptopMockupProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="relative cursor-pointer group max-w-2xl mx-auto"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Laptop Frame - MacBook Style */}
        <div className="relative">
          {/* Screen with Silver Bezel */}
          <div 
            className="relative rounded-t-2xl p-2 pt-4"
            style={{
              background: 'linear-gradient(135deg, #e8e8e8 0%, #d4d4d4 50%, #c0c0c0 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.1)'
            }}
          >
            {/* Camera */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rounded-full">
              <div className="absolute inset-0.5 bg-gray-800 rounded-full" />
            </div>
            
            {/* Inner Screen Border */}
            <div className="bg-black rounded-sm overflow-hidden border border-black">
              {/* Screen Content */}
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 px-4 py-2 rounded-lg text-sm">
                    Click to explore
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Base - Wider with Notch */}
          <div 
            className="relative h-3 rounded-b-sm"
            style={{
              background: 'linear-gradient(180deg, #c8c8c8 0%, #a8a8a8 100%)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {/* Notch/Hinge */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1.5 rounded-b"
              style={{
                background: 'linear-gradient(180deg, #b0b0b0 0%, #909090 100%)',
              }}
            />
          </div>

          {/* Bottom Lip */}
          <div 
            className="h-2 mx-6 rounded-b-xl"
            style={{
              background: 'linear-gradient(180deg, #d0d0d0 0%, #b8b8b8 50%, #a0a0a0 100%)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
            }}
          />
        </div>
        
        {/* Shadow */}
        <div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, #000 0%, transparent 70%)'
          }}
        />
      </div>

      <WebsitePreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={image}
        alt={alt}
        projectTitle={projectTitle}
      />
    </>
  );
}
