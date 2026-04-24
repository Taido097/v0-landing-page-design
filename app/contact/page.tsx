'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
              Have a project in mind? We'd love to hear about it. Tell us more and we'll be in touch soon.
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
                          href="mailto:hello@taido.com"
                          className="text-gray-700 hover:text-black transition-colors font-light"
                        >
                          hello@taido.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Phone className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="font-medium text-black text-sm uppercase tracking-wider">Phone</p>
                        <a
                          href="tel:+1234567890"
                          className="text-gray-700 hover:text-black transition-colors font-light"
                        >
                          (123) 456-7890
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
                          Remote - Working with clients worldwide
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
                    We typically respond within 24 hours
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
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
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
                    placeholder="Tell us about your project, goals, and budget..."
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
                      Thanks for reaching out! We'll be in touch soon.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 border border-red-300 bg-red-50 rounded-none">
                    <p className="text-red-900 text-sm font-light">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-gray-800 text-white rounded-none h-12 font-medium"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                <p className="text-xs text-gray-600 font-light">
                  We respect your privacy. No spam, ever.
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
