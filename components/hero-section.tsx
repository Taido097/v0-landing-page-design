'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-white via-white to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium">
                Award-Winning Web Design
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Design that converts your customers
            </h1>

            <p className="text-lg sm:text-xl text-foreground/70 max-w-lg leading-relaxed">
              Custom web design for small business owners and entrepreneurs. We create beautiful, high-converting websites that help you grow your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white rounded-full px-8"
              >
                <Link href="#cta" className="gap-2">
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-foreground/20 hover:bg-secondary"
              >
                <Link href="#portfolio">View Portfolio</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <p className="text-sm text-foreground/60">Projects Completed</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">4.9/5</div>
                <p className="text-sm text-foreground/60">Client Rating</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-2xl font-bold text-foreground">5 Years</div>
                <p className="text-sm text-foreground/60">In Business</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-accent/20 mx-auto mb-4 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-accent/30" />
                  </div>
                  <p className="text-foreground/50 font-medium">Beautiful Design</p>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 w-40 animate-bounce" style={{ animationDelay: '0s' }}>
              <p className="text-sm font-semibold text-foreground">Fast Loading</p>
              <p className="text-xs text-foreground/60">Optimized for speed</p>
            </div>

            <div className="absolute -top-6 -right-6 glass rounded-xl p-4 w-40 animate-bounce" style={{ animationDelay: '0.2s' }}>
              <p className="text-sm font-semibold text-foreground">Mobile Ready</p>
              <p className="text-xs text-foreground/60">Works on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
