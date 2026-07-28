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
    <section id="process" className="border-t border-gray-300 bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="mb-6 max-w-3xl text-5xl font-light leading-tight text-black sm:text-6xl">
            How We Work
          </h2>
          <p className="max-w-2xl text-lg font-light text-gray-700">
            Our process keeps your website simple, clear, and built around helping customers contact your business.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative flex h-full flex-col rounded-none border border-gray-300 p-6">
                <div className="absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                  {step.number}
                </div>

                <div className="pt-2">
                  <h3 className="mb-3 text-xl font-medium text-black">{step.title}</h3>
                  <p className="mb-6 flex-grow text-sm font-light leading-relaxed text-gray-700">
                    {step.description}
                  </p>

                  <div className="flex items-center gap-2 text-black">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">Included</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="about" className="mt-20 scroll-mt-24 border-t border-gray-300 pt-20">
          <h3 className="mb-8 text-3xl font-light text-black">Why Choose DesignedbyTD Studio?</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h4 className="mb-1 font-medium text-black">Custom Designs Only</h4>
                  <p className="text-sm font-light text-gray-700">
                    No random templates. Every design is created to match the business and make it easy for customers to take action.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h4 className="mb-1 font-medium text-black">Fast Turnaround</h4>
                  <p className="text-sm font-light text-gray-700">
                    Most simple business websites can be designed and launched quickly, so you can start using it with customers.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h4 className="mb-1 font-medium text-black">Ongoing Support</h4>
                  <p className="text-sm font-light text-gray-700">
                    After launch, you can get help with small updates, text changes, and improvements.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 pt-1">
                  <CheckCircle className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h4 className="mb-1 font-medium text-black">Built for Local Businesses</h4>
                  <p className="text-sm font-light text-gray-700">
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
