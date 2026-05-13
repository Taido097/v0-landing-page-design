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
    <section className="min-h-screen pt-28 pb-16 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Content */}
          <div
            className={`space-y-7 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="inline-flex items-center rounded-full border border-gray-300 px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-gray-600">
              Websites that actually convert
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-black leading-[0.95] tracking-tight">
              Your Website,
              <br />
              <span className="font-semibold">Made Real</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl leading-relaxed">
              Beautiful web design for small business owners and entrepreneurs. Build your online presence with a website that looks premium and sells your offer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-base font-medium"
              >
                <Link href="#cta" className="flex items-center gap-2">
                  Start Free <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base font-medium border-black text-black hover:bg-black hover:text-white"
              >
                <Link href="#portfolio">View Work</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-black">48+</div>
                <div className="text-gray-600 text-xs sm:text-sm mt-1">Websites Created</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-black">$2M+</div>
                <div className="text-gray-600 text-xs sm:text-sm mt-1">Revenue Generated</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-black">98%</div>
                <div className="text-gray-600 text-xs sm:text-sm mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`relative h-[420px] sm:h-[520px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <Image src="/hero-image.jpg" alt="Web Design" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
