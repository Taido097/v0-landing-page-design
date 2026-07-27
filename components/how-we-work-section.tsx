'use client';

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Discovery',
    description:
      'We start by understanding your business, goals, and target audience. This helps us create a strategy that actually works.',
  },
  {
    number: 2,
    title: 'Design',
    description:
      'We craft beautiful, modern designs that reflect your brand and convert visitors into customers. You get unlimited revisions.',
  },
  {
    number: 3,
    title: 'Development',
    description:
      'We build a fast, secure, and fully responsive website. Every detail is optimized for performance and a smooth customer experience.',
  },
  {
    number: 4,
    title: 'Launch & Support',
    description:
      'We launch your site and stick around. You get support after launch to make sure everything runs smoothly.',
  },
];

export function HowWeWorkSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="services" className="py-24 bg-white border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-6xl font-light text-black leading-tight mb-6 max-w-3xl">
            How We Work
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl font-light">
            Our process keeps your website simple, clear, and built around helping customers contact your business.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative p-6 border border-gray-300 rounded-none h-full flex flex-col">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>

                {/* Content */}
                <div className="pt-2">
                  <h3 className="text-xl font-medium text-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed font-light mb-6 flex-grow">
                    {step.description}
                  </p>

                  {/* Checkmark */}
                  <div className="flex items-center gap-2 text-black">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Included</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div id="about" className="mt-20 pt-20 border-t border-gray-300 scroll-mt-24">
          <h3 className="text-3xl font-light text-black mb-8">
            Why Choose DesignedbyTD Studio?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-black mb-1">Custom Designs Only</h4>
                  <p className="text-gray-700 text-sm font-light">
                    No random templates. Every design is created to match the business and make it easy for customers to take action.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-black mb-1">Fast Turnaround</h4>
                  <p className="text-gray-700 text-sm font-light">
                    Most simple business websites can be designed and launched quickly, so you can start using it with customers.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-black mb-1">Ongoing Support</h4>
                  <p className="text-gray-700 text-sm font-light">
                    After launch, you can get help with small updates, text changes, and improvements.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-black mb-1">Built for Local Businesses</h4>
                  <p className="text-gray-700 text-sm font-light">
                    The goal is not just a pretty site. The goal is to help customers trust you, call you, and request your service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
