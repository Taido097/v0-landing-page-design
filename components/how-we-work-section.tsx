'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

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

const benefits = [
  {
    number: '01',
    title: 'Custom Designs Only',
    description:
      'No random templates. Every design is created to match the business and make it easy for customers to take action.',
  },
  {
    number: '02',
    title: 'Fast Turnaround',
    description:
      'Most simple business websites can be designed and launched quickly, so you can start using it with customers.',
  },
  {
    number: '03',
    title: 'Ongoing Support',
    description:
      'After launch, you can get help with small updates, text changes, and improvements.',
  },
  {
    number: '04',
    title: 'Built for Local Businesses',
    description:
      'The goal is not just a pretty site. The goal is to help customers trust you, call you, and request your service.',
  },
];

export function HowWeWorkSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="process" className="scroll-mt-24 border-t border-black/10 bg-[#fafafa] py-20 text-[#121212] sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/10 pt-7 sm:pt-8">
          <h2 className="max-w-[900px] text-[clamp(3.5rem,7vw,6.25rem)] font-medium leading-[.9] tracking-[-0.06em]">
            How We Work
          </h2>
          <p className="mt-6 max-w-[520px] text-base font-light leading-[1.45] tracking-[-0.02em] text-black/70">
            Our process keeps your website simple, clear, and built around helping customers contact your business.
          </p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group relative aspect-[5/6] min-h-[360px] overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_1px_0_rgba(0,0,0,.02)] transition-all duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="absolute inset-0 translate-y-[102%] bg-[#121212] transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />

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
                  <span className="grid h-[18px] w-[18px] place-items-center rounded-full border-[1.5px] border-current text-[11px]">✓</span>
                  <span>Included</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="about" className="mt-20 scroll-mt-24 border-t border-black/10 pt-20 lg:mt-28 lg:pt-24">
          <div className="border-t border-black/10 pt-7 sm:pt-8">
            <h3 className="max-w-[1000px] text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[.92] tracking-[-0.06em]">
              Why Choose DesignedbyTD Studio?
            </h3>
            <p className="mt-6 max-w-[520px] text-base font-light leading-[1.45] tracking-[-0.02em] text-black/70">
              A focused website process built for local businesses that want to look professional and make it easier for customers to take action.
            </p>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-14">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.number}
                className={`group min-h-[235px] rounded-xl border border-black/10 bg-white p-6 transition-all duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_14px_38px_rgba(0,0,0,.06)] ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: `${240 + index * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-[#121212] text-base font-semibold text-white transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1.2,.36,1)] group-hover:-rotate-[8deg] group-hover:scale-110">
                    ✓
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-black/35">{benefit.number}</span>
                </div>
                <h4 className="mt-10 text-[clamp(26px,2.5vw,38px)] font-medium leading-none tracking-[-0.05em]">
                  {benefit.title}
                </h4>
                <p className="mt-3 max-w-[54ch] text-sm font-light leading-relaxed text-black/60">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
