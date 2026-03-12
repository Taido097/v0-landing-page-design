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
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-6xl font-light text-black leading-tight mb-6 max-w-3xl">
            Simple Pricing
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl font-light">
            Choose the right plan for your business. All include quality work and our full support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
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
              <div
                className={`h-full flex flex-col p-8 border rounded-none ${
                  plan.highlighted ? 'border-black bg-black text-white' : 'border-gray-300 bg-white'
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-block px-3 py-1 bg-white text-black text-xs font-semibold w-fit rounded-none">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-2xl font-light mb-2 ${plan.highlighted ? 'text-white' : 'text-black'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className={`text-4xl font-light ${plan.highlighted ? 'text-white' : 'text-black'}`}>
                    {plan.price}
                  </div>
                  {plan.price !== 'Custom' && (
                    <p className={`text-sm mt-2 ${plan.highlighted ? 'text-gray-400' : 'text-gray-600'}`}>
                      one-time project
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="mb-8 space-y-3 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-black'}`} />
                      <span className={`text-sm ${plan.highlighted ? 'text-gray-200' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className={`w-full py-6 text-base font-medium rounded-none ${
                    plan.highlighted
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <Link href={plan.ctaLink || '#cta'} className="gap-2">
                    {plan.ctaText || 'Get Started'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="pt-16 border-t border-gray-300">
          <h3 className="text-3xl font-light text-black text-center mb-12">
            Questions?
          </h3>
          <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            <div>
              <h4 className="font-medium text-black mb-3">
                Do you offer payment plans?
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed font-light">
                Yes! We offer flexible payment plans for projects over $2,000. Let's discuss what works best for you.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-black mb-3">
                What's included in support?
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed font-light">
                Support includes bug fixes, minor updates, and consultation during the included period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
