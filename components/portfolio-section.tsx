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
  },
  {
    id: 2,
    slug: 'auto-repair-shop',
    title: 'Auto Repair Shop',
    category: 'Service Business',
    description: 'Complete web solution for an auto repair business with service listings and appointment booking.',
    image: '/portfolio-auto-repair.jpg',
  },
  {
    id: 3,
    slug: 'salon-spa',
    title: 'Salon & Spa',
    category: 'Beauty Business',
    description: 'Modern website for a beauty salon with staff profiles, services, and online booking integration.',
    image: '/portfolio-salon.jpg',
  },
  {
    id: 4,
    slug: 'restaurant-website',
    title: 'Restaurant Website',
    category: 'Food & Beverage',
    description: 'Elegant restaurant site with menu showcase, reservations, and location integration.',
    image: '/portfolio-restaurant.jpg',
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
              <div className="space-y-6">
                {/* Project Image */}
                <div className="aspect-square rounded-lg bg-gray-100 p-3 sm:p-4">
                  <div className="h-full w-full rounded-xl border border-gray-300 bg-gray-900 p-2 sm:p-3 shadow-sm">
                    <div
                      className="h-full w-full overflow-y-auto rounded-md bg-white scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      aria-label={`${project.title} preview`}
                    >
                      <div className="relative min-h-[150%] w-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
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
