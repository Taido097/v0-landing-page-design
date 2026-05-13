'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface WebsitePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  alt: string;
  projectTitle: string;
}

export function WebsitePreviewModal({
  isOpen,
  onClose,
  image,
  alt,
  projectTitle,
}: WebsitePreviewModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when modal opens
  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            'fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
            'w-[90vw] h-[90vh] max-w-6xl',
            'bg-white rounded-lg shadow-2xl overflow-hidden',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'duration-300'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              {/* Browser Dots */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <DialogTitle className="text-sm font-medium text-gray-700">
                {projectTitle}
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            className="h-[calc(90vh-64px)] overflow-y-auto"
          >
            {/* Website Preview - Extended vertically to simulate full page */}
            <div className="relative">
              {/* Main Project Image */}
              <div className="relative w-full">
                <Image
                  src={image}
                  alt={alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Simulated Additional Sections */}
              <div className="bg-gray-50 py-16 px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-light text-gray-800 mb-4">
                    About Section
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    This is a preview of the website&apos;s about section. The actual
                    website includes professional photography, detailed service
                    descriptions, and engaging content that converts visitors into
                    customers.
                  </p>
                </div>
              </div>

              <div className="bg-white py-16 px-8">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-light text-gray-800 mb-8 text-center">
                    Services
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-6 border border-gray-200 rounded-lg text-center"
                      >
                        <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4" />
                        <h3 className="font-medium text-gray-800 mb-2">
                          Service {i}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Professional service with attention to detail and quality
                          results.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 py-16 px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-light text-white mb-4">
                    Get In Touch
                  </h2>
                  <p className="text-gray-400 mb-8">
                    Ready to start your project? Contact us today for a free
                    consultation.
                  </p>
                  <div className="inline-block bg-white text-gray-900 px-8 py-3 font-medium">
                    Contact Us
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-950 py-8 px-8">
                <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
                  <p>Demo website preview - Scroll to explore all sections</p>
                </div>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
