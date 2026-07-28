'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/#services', label: 'Services' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#about', label: 'About' },
  ];

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled && !isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b text-white transition-all duration-500 ${
        isTransparent
          ? 'border-transparent bg-transparent'
          : 'border-white/10 bg-black/90 shadow-[0_12px_35px_rgba(0,0,0,.24)] backdrop-blur-xl'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          DesignedbyTD Studio
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center md:flex">
          <Button
            asChild
            className="rounded-md border border-white bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            <Link href="/contact">Start Free</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-md p-2 text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-md px-3 py-3 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-3 w-full rounded-md bg-white py-6 text-black hover:bg-white/90">
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
