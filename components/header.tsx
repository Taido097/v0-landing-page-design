'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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
  const showCompactHeader = isScrolled || !isHome || isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        showCompactHeader
          ? 'border-black/10 bg-white text-black shadow-[0_8px_28px_rgba(0,0,0,.045)]'
          : 'border-transparent bg-transparent text-white'
      }`}
    >
      {showCompactHeader ? (
        <nav className="grid h-[78px] w-full grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-[88px] sm:px-6 lg:h-[98px] lg:px-8">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="group justify-self-start p-1 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.8} />
            ) : (
              <span className="flex h-8 w-10 flex-col justify-between py-1.5 sm:h-9 sm:w-11">
                <span className="block h-[2px] w-full bg-black transition-transform duration-300 group-hover:translate-x-1" />
                <span className="block h-[2px] w-[78%] bg-black transition-transform duration-300 group-hover:translate-x-1.5" />
                <span className="block h-[2px] w-full bg-black transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            )}
          </button>

          <Link
            href="/"
            className="justify-self-center text-xs font-bold tracking-[-0.04em] text-black sm:text-sm"
          >
            DesignedbyTD
          </Link>

          <Link
            href="/contact"
            className="group grid h-[52px] grid-cols-[auto_42px] justify-self-end border-[4px] border-black bg-black text-white sm:h-[60px] sm:grid-cols-[auto_50px] lg:h-[68px] lg:grid-cols-[auto_58px] lg:border-[5px]"
          >
            <span className="hidden min-w-[132px] items-center justify-center px-4 text-xs font-bold uppercase sm:flex lg:min-w-[162px] lg:text-sm">
              Start a project
            </span>
            <span className="flex items-center justify-center bg-white text-black">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-6 sm:w-6" strokeWidth={1.8} />
            </span>
          </Link>
        </nav>
      ) : (
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
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

          <Link
            href="/contact"
            className="hidden rounded-md border border-white bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90 md:inline-flex"
          >
            Start Free
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="rounded-md p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      )}

      {isMenuOpen && (
        <div className="border-t border-black/10 bg-white text-black shadow-[0_18px_40px_rgba(0,0,0,.08)]">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="grid gap-1 md:grid-cols-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-black/10 px-2 py-4 text-sm font-medium transition-colors hover:bg-black hover:px-4 hover:text-white md:border-b-0"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
