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
    <section id="cta" className="py-20 bg-gradient-to-b from-white to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Ready to Transform Your Online Presence?
          </h2>

          <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's create a beautiful, high-converting website for your business. Get a free consultation to discuss your project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 h-12"
            >
              <Link href="/contact" className="gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 border-foreground/20 hover:bg-secondary"
            >
              <a href="tel:+1234567890">Call Us: (123) 456-7890</a>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="mt-16 pt-12 border-t border-border">
            <p className="text-foreground/60 text-sm font-medium mb-6">
              Join 50+ businesses that trust us with their online success
            </p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">100%</div>
                <p className="text-xs text-foreground/60">Custom Design</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">Fast</div>
                <p className="text-xs text-foreground/60">2-4 Week Turnaround</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">Support</div>
                <p className="text-xs text-foreground/60">30-90 Days Included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
