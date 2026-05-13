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
        className="relative cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Laptop Frame */}
        <div className="relative">
          {/* Screen Bezel */}
          <div className="bg-gray-800 rounded-t-xl p-3 pb-0">
            {/* Camera */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rounded-full" />
            
            {/* Screen */}
            <div className="bg-gray-900 rounded-t-lg overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
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

          {/* Keyboard Base */}
          <div className="bg-gray-300 h-4 rounded-b-lg relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-400 rounded-b-lg" />
          </div>

          {/* Bottom Edge */}
          <div className="bg-gray-400 h-1.5 rounded-b-xl mx-8" />
        </div>
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
