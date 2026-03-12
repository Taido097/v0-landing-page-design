'use client';

import { useEffect, useState } from 'react';
import { GlassCard } from '@/components/glass-card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Owner, Sarah\'s Photography',
    content:
      'Tai completely transformed my online presence. My website is beautiful, loads fast, and I\'ve gotten more inquiries than ever before. Highly recommended!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Manager, Auto Repair Plus',
    content:
      'We needed a professional website with an online booking system. Tai delivered exactly what we needed on time and under budget. Great communication throughout.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lisa Rodriguez',
    role: 'Founder, Luxe Salon & Spa',
    content:
      'The website is stunning and our clients love how easy it is to book appointments. The mobile optimization is excellent. This was a great investment for our business.',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Thompson',
    role: 'Owner, Thompson\'s Restaurant',
    content:
      'Working with Tai was seamless. They understood our vision and created a website that truly represents our brand. Our online reservations increased by 40%.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-semibold mb-4">Social Proof</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We're proud of the relationships we build with our clients and the results we deliver.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <GlassCard>
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 pt-20 border-t border-border">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">50+</div>
              <p className="text-foreground/60">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <p className="text-foreground/60">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">$2M+</div>
              <p className="text-foreground/60">Revenue Generated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">5+</div>
              <p className="text-foreground/60">Years in Business</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
