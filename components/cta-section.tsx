'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="cta" className="py-24 bg-white border-t border-gray-300 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light text-black mb-6 leading-tight">
            Ready to start?
          </h2>

          <p className="text-lg sm:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Let's create a clean, professional website that helps customers understand your business and contact you faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-base font-medium rounded-none"
            >
              <Link href="/contact" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="border border-black text-black hover:bg-black hover:text-white px-8 py-6 text-base font-medium rounded-none bg-white"
            >
              <a href="mailto:designedbytd.studio@gmail.com">Email Me</a>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="mt-16 pt-16 border-t border-gray-300">
            <p className="text-gray-700 text-sm font-light mb-8">
              Website design for local businesses and entrepreneurs
            </p>
            <div className="flex flex-wrap justify-center gap-12 items-center">
              <div className="text-center">
                <div className="text-4xl font-light text-black mb-2">100%</div>
                <p className="text-sm text-gray-600 font-light">Custom Design</p>
              </div>
              <div className="w-px h-10 bg-gray-300 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-light text-black mb-2">2-4</div>
                <p className="text-sm text-gray-600 font-light">Week Turnaround</p>
              </div>
              <div className="w-px h-10 bg-gray-300 hidden sm:block" />
              <div className="text-center">
                <div className="text-4xl font-light text-black mb-2">∞</div>
                <p className="text-sm text-gray-600 font-light">Ongoing Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
