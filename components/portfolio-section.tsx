'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    slug: 'photography-studio',
    title: 'Photography Studio',
    category: 'Portfolio Website',
    description: 'Beautiful portfolio site for a photography business with image gallery and booking system.',
    image: '/portfolio-photography.jpg',
    style: 'dark', // Dark, elegant, gallery-focused
    accent: '#ffffff',
    bg: '#000000',
  },
  {
    id: 2,
    slug: 'auto-repair-shop',
    title: 'Auto Repair Shop',
    category: 'Service Business',
    description: 'Complete web solution for an auto repair business with service listings and appointment booking.',
    image: '/portfolio-auto-repair.jpg',
    style: 'bold', // Bold, trustworthy, industrial
    accent: '#f97316',
    bg: '#0f172a',
  },
  {
    id: 3,
    slug: 'salon-spa',
    title: 'Salon & Spa',
    category: 'Beauty Business',
    description: 'Modern website for a beauty salon with staff profiles, services, and online booking integration.',
    image: '/portfolio-salon.jpg',
    style: 'elegant', // Soft, luxurious, rose gold
    accent: '#c9a87c',
    bg: '#faf8f5',
  },
  {
    id: 4,
    slug: 'restaurant-website',
    title: 'Restaurant Website',
    category: 'Food & Beverage',
    description: 'Elegant restaurant site with menu showcase, reservations, and location integration.',
    image: '/portfolio-restaurant.jpg',
    style: 'warm', // Warm, earthy, elegant typography
    accent: '#d4a574',
    bg: '#1a1a1a',
  },
];

export function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-6xl font-light text-black leading-tight mb-6 max-w-3xl">
            Work We're Proud Of
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl font-light">
            Each website is custom-built to help businesses grow online and convert customers.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="space-y-6 group">
                {/* Styled Website Preview Card */}
                <div 
                  className="aspect-[4/3] rounded-lg overflow-hidden relative shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  style={{ backgroundColor: project.bg }}
                >
                  {/* Mini Browser Chrome */}
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-black/20">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="flex-1 mx-4 h-4 bg-white/10 rounded text-[8px] text-white/50 flex items-center px-2">
                      {project.slug}.com
                    </div>
                  </div>

                  {/* Website Preview Content */}
                  <div className="relative h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-60"
                    />
                    
                    {/* Style Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                      {project.style === 'dark' && (
                        <div className="text-center text-white">
                          <p className="text-[10px] tracking-[0.3em] opacity-70 mb-1">PORTFOLIO</p>
                          <h4 className="text-2xl font-light tracking-widest">GALLERY</h4>
                        </div>
                      )}
                      {project.style === 'bold' && (
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: project.accent }}>
                            <span className="text-white font-bold">M</span>
                          </div>
                          <h4 className="text-xl font-bold text-white">TRUSTED SERVICE</h4>
                          <button className="mt-3 px-4 py-1.5 text-xs font-medium rounded" style={{ backgroundColor: project.accent, color: '#fff' }}>
                            Book Now
                          </button>
                        </div>
                      )}
                      {project.style === 'elegant' && (
                        <div className="text-center text-[#3d3d3d]">
                          <p className="text-lg font-light tracking-[0.2em]" style={{ color: project.accent }}>LUXE</p>
                          <h4 className="text-xl font-light italic mt-1">Beauty & Wellness</h4>
                          <button className="mt-3 px-6 py-2 text-xs tracking-wider text-white" style={{ backgroundColor: project.accent }}>
                            BOOK
                          </button>
                        </div>
                      )}
                      {project.style === 'warm' && (
                        <div className="text-center text-white">
                          <p className="text-[10px] tracking-[0.3em] opacity-70 mb-1">FARM TO TABLE</p>
                          <h4 className="text-2xl font-serif" style={{ color: project.accent }}>Harvest Table</h4>
                          <button className="mt-3 px-4 py-1.5 text-xs tracking-wider" style={{ backgroundColor: project.accent, color: '#1a1a1a' }}>
                            RESERVE
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 uppercase tracking-wider font-medium">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-light text-black">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-light">
                    {project.description}
                  </p>
                  <Link 
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center gap-2 text-black font-medium hover:gap-3 transition-all pt-2"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-gray-200">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-black hover:bg-gray-800 text-white font-medium transition-colors rounded-none">
            See All Work
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
