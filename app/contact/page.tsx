'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, ArrowLeft } from 'lucide-react';

const CONTACT_EMAIL = 'designedbytd.studio@gmail.com';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Website request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nBusiness: ${formData.company || 'Not provided'}\n\nProject Details:\n${formData.message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitStatus('success');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen pt-20">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors text-sm font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Hero */}
        <section className="bg-white py-20 border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-6xl sm:text-7xl font-light text-black mb-6">
              Let's Talk
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-light">
              Tell me what kind of website you need. This form will open your email app with the message ready to send.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 flex-grow">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-16">
              {/* Contact Info */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-light text-black mb-8">
                    Contact Info
                  </h2>

                  {/* Contact Methods */}
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Mail className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="font-medium text-black text-sm uppercase tracking-wider">Email</p>
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="text-gray-700 hover:text-black transition-colors font-light"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <MapPin className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="font-medium text-black text-sm uppercase tracking-wider">Location</p>
                        <p className="text-gray-700 font-light">
                          Orange County, CA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="p-6 border border-gray-300 rounded-none bg-white">
                  <p className="text-sm text-gray-700 font-light">
                    <span className="font-medium text-black">
                      Response Time:
                    </span>{' '}
                    I typically respond within 24 hours.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="lg:col-span-2 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-black uppercase tracking-wider"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="rounded-none border-gray-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-black uppercase tracking-wider"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="rounded-none border-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-black uppercase tracking-wider"
                  >
                    Company/Business
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Your business name"
                    value={formData.company}
                    onChange={handleChange}
                    className="rounded-none border-gray-300"
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-black uppercase tracking-wider"
                  >
                    Project Details
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me what kind of website you want..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="rounded-none border-gray-300 resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 border border-green-300 bg-green-50 rounded-none">
                    <p className="text-green-900 text-sm font-light">
                      Your email app should open with the message ready to send. If it does not open, email me directly at {CONTACT_EMAIL}.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white rounded-none h-12 font-medium"
                >
                  Open Email to Send
                </Button>

                <p className="text-xs text-gray-600 font-light">
                  This opens your email app so you can review the message before sending.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
