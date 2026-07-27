'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/#services', label: 'Services' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#about', label: 'About' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg text-black">
          DesignedbyTD Studio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-black transition-colors duration-200 text-sm font-light"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 text-sm font-medium rounded-none"
          >
            <Link href="/contact">Start Free</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-none transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-black" />
          ) : (
            <Menu className="w-5 h-5 text-black" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-black transition-colors duration-200 text-sm font-light"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="w-full bg-black hover:bg-gray-800 text-white rounded-none text-sm font-medium py-6"
            >
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Start Free
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
