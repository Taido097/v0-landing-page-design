'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { GlassCard } from '@/components/glass-card';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Photography Studio',
    category: 'Portfolio Website',
    description: 'Beautiful portfolio site for a photography business with image gallery and booking system.',
    tags: ['Next.js', 'Tailwind', 'Gallery'],
    image: '/portfolio-photography.jpg',
  },
  {
    id: 2,
    title: 'Auto Repair Shop',
    category: 'Service Business',
    description: 'Complete web solution for an auto repair business with service listings and appointment booking.',
    tags: ['React', 'Appointment System', 'Mobile'],
    image: '/portfolio-auto-repair.jpg',
  },
  {
    id: 3,
    title: 'Salon & Spa',
    category: 'Beauty Business',
    description: 'Modern website for a beauty salon with staff profiles, services, and online booking integration.',
    tags: ['Booking System', 'Responsive', 'Modern Design'],
    image: '/portfolio-salon.jpg',
  },
  {
    id: 4,
    title: 'Restaurant Website',
    category: 'Food & Beverage',
    description: 'Elegant restaurant site with menu showcase, reservations, and location integration.',
    tags: ['Menu System', 'Reservations', 'Tailwind CSS'],
    image: '/portfolio-restaurant.jpg',
  },
];

export function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-semibold mb-4">Our Work</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Check out some of our recent work. Each project is custom-built to meet our clients' unique needs and goals.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
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
              <GlassCard>
                <div className="space-y-4">
                  {/* Project Image */}
                  <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-accent font-semibold">{project.category}</p>
                    <h3 className="text-xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View More */}
                  <button className="w-full mt-4 py-2 px-4 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-semibold transition-colors flex items-center justify-center gap-2 group">
                    View Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent/90 text-white font-semibold transition-colors">
            See All Projects
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
