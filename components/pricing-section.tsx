'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/glass-card';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '$1,500',
    description: 'Perfect for small businesses just getting online',
    features: [
      'Up to 5 pages',
      'Mobile responsive',
      'Contact form',
      'Basic SEO',
      'SSL certificate',
      '30 days of support',
    ],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$3,500',
    description: 'Great for established businesses wanting to scale',
    features: [
      'Up to 15 pages',
      'E-commerce ready',
      'Advanced SEO',
      'Blog setup',
      'Booking system',
      'Analytics integration',
      '90 days of support',
      'Monthly updates included',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For complex projects requiring custom solutions',
    features: [
      'Unlimited pages',
      'Full e-commerce suite',
      'Custom integrations',
      'Advanced analytics',
      'Team collaboration',
      'Priority support',
      '6+ months of support',
      'Ongoing maintenance',
    ],
    highlighted: false,
    ctaText: 'Book a Call',
    ctaLink: '#contact',
  },
];

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="pricing" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-semibold mb-4">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include our commitment to quality and customer success.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <GlassCard
                className={`h-full flex flex-col ${
                  plan.highlighted ? 'ring-2 ring-accent scale-105' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold w-fit">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-foreground/60 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </div>
                  {plan.price !== 'Custom' && (
                    <p className="text-foreground/60 text-sm mt-2">one-time project</p>
                  )}
                </div>

                {/* Features List */}
                <div className="mb-8 space-y-3 flex-grow">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  variant={plan.highlighted ? 'default' : 'outline'}
                  className={`w-full rounded-full ${
                    plan.highlighted
                      ? 'bg-accent hover:bg-accent/90 text-white'
                      : ''
                  }`}
                >
                  <Link
                    href={plan.ctaLink || '#cta'}
                    className="gap-2"
                  >
                    {plan.ctaText || 'Get Started'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 pt-20 border-t border-border">
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Questions?
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Do you offer payment plans?
              </h4>
              <p className="text-foreground/70 text-sm">
                Yes! We offer flexible payment plans for projects over $2,000. Let's discuss what works best for you.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                What's included in support?
              </h4>
              <p className="text-foreground/70 text-sm">
                Support includes bug fixes, minor updates, and consultation during the included period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
