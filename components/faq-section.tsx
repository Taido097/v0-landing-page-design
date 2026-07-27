'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "How long does a website project take?",
    answer:
      "Most simple business websites take 2-4 weeks from start to launch. The timeline depends on the number of pages, features, and how quickly feedback is provided.",
  },
  {
    id: 2,
    question: "What's included in your web design service?",
    answer:
      "A typical project can include custom design, mobile responsive pages, contact form setup, basic SEO structure, launch support, and help after the website goes live.",
  },
  {
    id: 3,
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes. After launch, you can get help with small updates, text changes, bug fixes, and improvements as your business grows.",
  },
  {
    id: 4,
    question: "Can you redesign my existing website?",
    answer:
      "Yes. If your current website looks outdated or does not clearly explain your services, we can redesign it into something cleaner and easier for customers to use.",
  },
  {
    id: 5,
    question: "Can you add forms or booking links?",
    answer:
      "Yes. We can add contact forms, quote request forms, booking links, Google Maps, phone buttons, and other features that make it easier for customers to reach you.",
  },
  {
    id: 6,
    question: "Can I request revisions?",
    answer:
      "Yes. Revisions are part of the design process so the final website feels right for your business before launch.",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-gray-300 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-6xl font-light text-black leading-tight mb-6">
            Common Questions
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl font-light">
            Have questions about the process? Here are answers to the most common ones.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-300 rounded-none overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 text-left font-medium text-black hover:bg-gray-50 transition-colors flex items-center justify-between gap-4"
              >
                <span className="text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openId === faq.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-300">
                  <p className="text-gray-700 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-16 border-t border-gray-300 text-center">
          <p className="text-gray-700 mb-6 font-light">
            Still have questions? Send a quick message.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-black hover:bg-gray-800 text-white font-medium transition-colors rounded-none"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
