'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle } from 'lucide-react';

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

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group relative aspect-[5/6] min-h-[360px] overflow-hidden rounded-xl border border-black/10 bg-[#f7f7f7] shadow-[0_1px_0_rgba(0,0,0,.02)] transition-all duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 80}ms`,
                background:
                  'radial-gradient(circle at 75% 18%, rgba(0,0,0,.035), transparent 26%), linear-gradient(160deg, #ffffff 0%, #f5f5f5 100%)',
              }}
            >
              <div className="absolute inset-0 translate-y-[102%] bg-[#121212] transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-black/[0.07] to-transparent transition-opacity duration-300 group-hover:opacity-0" />

              <div className="absolute left-4 top-4 z-10 grid h-[38px] w-[38px] place-items-center rounded-full bg-[#121212] text-sm font-semibold text-white transition-all duration-500 [transition-timing-function:cubic-bezier(.22,1.2,.36,1)] group-hover:rotate-[7deg] group-hover:scale-110 group-hover:bg-white group-hover:text-[#121212]">
                {step.number}
              </div>

              <div className="absolute right-4 top-4 z-10 grid h-[34px] w-[34px] place-items-center rounded-full border border-black/10 bg-white/75 text-black/45 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-black">
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </div>

              <div className="absolute inset-0 z-[2] flex flex-col justify-end p-5 text-[#121212] transition-colors duration-300 group-hover:text-white">
                <h3 className="mb-3 text-[clamp(24px,2vw,34px)] font-medium leading-[1.03] tracking-[-0.045em]">
                  {step.title}
                </h3>
                <p className="mb-5 max-w-[28ch] text-sm font-light leading-relaxed text-black/60 transition-colors duration-300 group-hover:text-white/65">
                  {step.description}
                </p>

                <div className="flex items-center gap-2 border-t border-black/10 pt-3.5 text-[11px] font-bold uppercase tracking-[0.11em] transition-colors duration-300 group-hover:border-white/20">
                  <span className="grid h-[18px] w-[18px] place-items-center rounded-full border-[1.5px] border-current text-[11px]">
                    ✓
                  </span>
                  <span>Included</span>
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
