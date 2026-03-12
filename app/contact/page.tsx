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
      // TODO: Integrate with email service (SendGrid, Mailgun, etc.)
      console.log('Form submitted:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
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
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-b from-white to-secondary/20 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4">
              Let's Work Together
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear about it. Get in touch and let's create something amazing.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 flex-grow">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-8">
                    Get In Touch
                  </h2>

                  {/* Contact Methods */}
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <a
                          href="mailto:hello@taido.com"
                          className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                          hello@taido.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Phone</p>
                        <a
                          href="tel:+1234567890"
                          className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                          (123) 456-7890
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Location</p>
                        <p className="text-foreground/70">
                          Remote - Working with clients worldwide
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="p-4 rounded-lg bg-secondary">
                  <p className="text-sm text-foreground/60">
                    <span className="font-semibold text-foreground">
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-foreground"
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
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Project Details *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project, goals, and budget..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="rounded-lg resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-green-800">
                      Thanks for reaching out! We'll be in touch soon.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-red-800">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-white rounded-lg h-12"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                <p className="text-xs text-foreground/50">
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
