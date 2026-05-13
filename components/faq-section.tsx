'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "How long does a website project take?",
    answer:
      "Most projects take 2-4 weeks from start to launch. The timeline depends on the complexity of your project, the number of pages, and how quickly you can provide feedback. We'll give you a detailed timeline during our initial consultation.",
  },
  {
    id: 2,
    question: "What's included in your web design service?",
    answer:
      "Our services include custom design, responsive development, SEO optimization, form integration, and 30-90 days of support. We handle everything from concept to launch, ensuring your website is beautiful and functional.",
  },
  {
    id: 3,
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes! All projects include 30-90 days of free support. After that, we offer maintenance packages for updates, security patches, and new features. You can always reach out if you need help.",
  },
  {
    id: 4,
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. Whether you need a complete redesign or just an update, we can help. We'll analyze your current site and create something that better serves your business goals and customers.",
  },
  {
    id: 5,
    question: "Do you handle e-commerce or booking systems?",
    answer:
      "Yes, we specialize in building e-commerce sites, booking systems, and custom functionality. We can integrate Shopify, Stripe, calendars, appointment systems, and more.",
  },
  {
    id: 6,
    question: "What if I need revisions after launch?",
    answer:
      "We include revisions during the design and development process. After launch, minor updates are covered under your support period. Larger changes can be quoted separately.",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-white border-t border-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-6xl font-light text-black leading-tight mb-6">
            Common Questions
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl font-light">
            Have questions about our process? Here are answers to the most common ones.
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
            Still have questions? We're here to help.
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
