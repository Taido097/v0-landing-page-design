'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { X, Camera, Calendar, Users, Star, Mail, Phone, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

interface WebsitePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  alt: string;
  projectTitle: string;
}

export function WebsitePreviewModal({
  isOpen,
  onClose,
  image,
  alt,
  projectTitle,
}: WebsitePreviewModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            'fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
            'w-[90vw] h-[90vh] max-w-6xl',
            'bg-white rounded-lg shadow-2xl overflow-hidden',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'duration-300'
          )}
        >
          {/* Browser Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="hidden sm:flex items-center bg-white rounded-md px-3 py-1.5 text-xs text-gray-500 border border-gray-200">
                <span className="truncate max-w-[200px]">www.{projectTitle.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
            </div>
            <DialogTitle className="sr-only">{projectTitle} Preview</DialogTitle>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"
              aria-label="Close preview"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Scrollable Website Content */}
          <div
            ref={scrollContainerRef}
            className="h-[calc(90vh-52px)] overflow-y-auto bg-white"
          >
            {/* ========== PHOTOGRAPHY STUDIO LANDING PAGE ========== */}
            
            {/* Navigation */}
            <nav className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100">
              <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-6 h-6 text-rose-600" />
                  <span className="font-semibold text-gray-900">Sarah Chen Photography</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
                  <span className="hover:text-gray-900 cursor-pointer">Portfolio</span>
                  <span className="hover:text-gray-900 cursor-pointer">Services</span>
                  <span className="hover:text-gray-900 cursor-pointer">About</span>
                  <span className="hover:text-gray-900 cursor-pointer">Contact</span>
                </div>
                <button className="bg-rose-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-rose-700 transition-colors">
                  Book Now
                </button>
              </div>
            </nav>

            {/* Hero Section */}
            <section className="relative">
              <div className="relative w-full aspect-[16/9] max-h-[500px] overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-6xl mx-auto px-6 w-full">
                    <div className="max-w-xl">
                      <p className="text-rose-300 font-medium mb-2 tracking-wide text-sm">CAPTURING LIFE&apos;S PRECIOUS MOMENTS</p>
                      <h1 className="text-4xl md:text-5xl font-light text-white mb-4 leading-tight">
                        Timeless Photography for Your Special Day
                      </h1>
                      <p className="text-gray-200 mb-6 leading-relaxed">
                        Professional wedding and portrait photography that tells your unique story with elegance and authenticity.
                      </p>
                      <div className="flex gap-3">
                        <button className="bg-rose-600 text-white px-6 py-3 font-medium rounded-md hover:bg-rose-700 transition-colors flex items-center gap-2">
                          View Portfolio <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 font-medium rounded-md border border-white/30 hover:bg-white/20 transition-colors">
                          Get in Touch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-gray-50 border-y border-gray-100">
              <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <p className="text-3xl font-light text-rose-600">500+</p>
                    <p className="text-sm text-gray-600 mt-1">Weddings Captured</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-rose-600">12</p>
                    <p className="text-sm text-gray-600 mt-1">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-rose-600">50+</p>
                    <p className="text-sm text-gray-600 mt-1">Awards Won</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-rose-600">100%</p>
                    <p className="text-sm text-gray-600 mt-1">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section className="py-16 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <p className="text-rose-600 font-medium text-sm tracking-wide mb-2">WHAT WE OFFER</p>
                  <h2 className="text-3xl font-light text-gray-900">Our Photography Services</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="group p-8 border border-gray-200 rounded-xl hover:border-rose-200 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-rose-100 transition-colors">
                      <Camera className="w-7 h-7 text-rose-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Wedding Photography</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Full-day coverage capturing every precious moment, from preparation to the last dance.
                    </p>
                    <p className="text-rose-600 font-medium text-sm">Starting at $3,500</p>
                  </div>
                  <div className="group p-8 border border-gray-200 rounded-xl hover:border-rose-200 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-rose-100 transition-colors">
                      <Users className="w-7 h-7 text-rose-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Portrait Sessions</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Individual, couple, or family portraits in studio or your favorite outdoor location.
                    </p>
                    <p className="text-rose-600 font-medium text-sm">Starting at $350</p>
                  </div>
                  <div className="group p-8 border border-gray-200 rounded-xl hover:border-rose-200 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-rose-100 transition-colors">
                      <Calendar className="w-7 h-7 text-rose-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Event Coverage</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Corporate events, parties, and special occasions documented beautifully.
                    </p>
                    <p className="text-rose-600 font-medium text-sm">Starting at $800</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Portfolio Gallery */}
            <section className="py-16 px-6 bg-gray-50">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <p className="text-rose-600 font-medium text-sm tracking-wide mb-2">OUR WORK</p>
                  <h2 className="text-3xl font-light text-gray-900">Featured Portfolio</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'from-rose-200 to-rose-300',
                    'from-amber-200 to-amber-300',
                    'from-emerald-200 to-emerald-300',
                    'from-sky-200 to-sky-300',
                    'from-violet-200 to-violet-300',
                    'from-pink-200 to-pink-300',
                    'from-orange-200 to-orange-300',
                    'from-teal-200 to-teal-300',
                  ].map((gradient, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "aspect-square rounded-lg bg-gradient-to-br overflow-hidden cursor-pointer hover:opacity-90 transition-opacity",
                        gradient,
                        i === 0 && "md:col-span-2 md:row-span-2"
                      )}
                    />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <button className="text-rose-600 font-medium hover:text-rose-700 transition-colors flex items-center gap-2 mx-auto">
                    View Full Gallery <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <p className="text-rose-600 font-medium text-sm tracking-wide mb-2">TESTIMONIALS</p>
                  <h2 className="text-3xl font-light text-gray-900">What Our Clients Say</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { name: 'Emily & James', event: 'Wedding, 2024', text: 'Sarah captured our wedding day perfectly. Every photo tells a story and brings back beautiful memories.' },
                    { name: 'The Martinez Family', event: 'Family Portrait', text: 'Amazing experience from start to finish. Sarah made everyone feel comfortable and the photos are stunning!' },
                    { name: 'Rebecca Turner', event: 'Corporate Event', text: 'Professional, punctual, and incredibly talented. The event photos exceeded all our expectations.' },
                  ].map((testimonial, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-xl">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">&quot;{testimonial.text}&quot;</p>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 bg-gray-900">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-light text-white mb-4">Ready to Capture Your Story?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Let&apos;s create beautiful, timeless photographs together. Book your session today and preserve your precious moments forever.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-rose-600 text-white px-8 py-3 font-medium rounded-md hover:bg-rose-700 transition-colors">
                    Book a Consultation
                  </button>
                  <button className="bg-transparent text-white px-8 py-3 font-medium rounded-md border border-gray-600 hover:border-gray-400 transition-colors">
                    View Pricing
                  </button>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-6 bg-gray-50">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <p className="text-rose-600 font-medium text-sm tracking-wide mb-2">GET IN TOUCH</p>
                    <h2 className="text-3xl font-light text-gray-900 mb-6">Contact Us</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-gray-900">(555) 123-4567</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-900">hello@sarahchenphotography.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Studio Location</p>
                          <p className="text-gray-900">123 Creative Ave, San Francisco, CA</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-colors">
                        <Instagram className="w-5 h-5 text-gray-700" />
                      </div>
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-colors">
                        <Facebook className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-medium text-gray-900 mb-6">Send a Message</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">First Name</label>
                          <div className="w-full h-10 bg-gray-50 rounded-md border border-gray-200" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                          <div className="w-full h-10 bg-gray-50 rounded-md border border-gray-200" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <div className="w-full h-10 bg-gray-50 rounded-md border border-gray-200" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Message</label>
                        <div className="w-full h-24 bg-gray-50 rounded-md border border-gray-200" />
                      </div>
                      <button className="w-full bg-rose-600 text-white py-3 font-medium rounded-md hover:bg-rose-700 transition-colors">
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                      <Camera className="w-6 h-6 text-rose-400" />
                      <span className="font-semibold text-white">Sarah Chen Photography</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                      Capturing life&apos;s precious moments with artistry and passion. Based in San Francisco, available worldwide.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-4">Quick Links</h4>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p className="hover:text-white cursor-pointer">Portfolio</p>
                      <p className="hover:text-white cursor-pointer">Services</p>
                      <p className="hover:text-white cursor-pointer">Pricing</p>
                      <p className="hover:text-white cursor-pointer">Contact</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-4">Services</h4>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p className="hover:text-white cursor-pointer">Weddings</p>
                      <p className="hover:text-white cursor-pointer">Portraits</p>
                      <p className="hover:text-white cursor-pointer">Events</p>
                      <p className="hover:text-white cursor-pointer">Commercial</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                  <p>&copy; 2024 Sarah Chen Photography. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
