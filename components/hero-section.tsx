'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered Content */}
        <div
          className={`text-center space-y-8 mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Main Headline */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light text-black leading-tight tracking-tight max-w-5xl mx-auto">
            Your Website, Made Real
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
            Beautiful web design for small business owners and entrepreneurs. Build your online presence with a website that converts.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-base font-medium rounded-none"
            >
              <Link href="#cta" className="flex items-center gap-2">
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-medium rounded-none border-black text-black hover:bg-black hover:text-white"
            >
              <Link href="#portfolio">View Work</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="pt-12 flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center border-t border-gray-300">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black">48+</div>
              <div className="text-gray-700 text-sm mt-3">Websites Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black">$2M+</div>
              <div className="text-gray-700 text-sm mt-3">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-black">98%</div>
              <div className="text-gray-700 text-sm mt-3">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div
          className={`relative h-96 md:h-[600px] rounded-lg overflow-hidden transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <Image
            src="/hero-image.jpg"
            alt="Web Design"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
