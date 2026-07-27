import Link from 'next/link';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Portfolio', href: '/#portfolio' },
        { label: 'Services', href: '/#services' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'FAQ', href: '/#faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/#about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Email', href: 'mailto:designedbytd.studio@gmail.com' },
      ],
    },
    {
      title: 'Get Started',
      links: [
        { label: 'Request a Website', href: '/contact' },
        { label: 'View Work', href: '/#portfolio' },
        { label: 'See Pricing', href: '/#pricing' },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Branding */}
          <div className="space-y-4">
            <Link href="/" className="font-bold text-lg">
              DesignedbyTD Studio
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Custom web design for local business owners who want a clean, professional website.
            </p>
            <div className="flex flex-col gap-2 pt-4">
              <a
                href="mailto:designedbytd.studio@gmail.com"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                designedbytd.studio@gmail.com
              </a>
              <p className="text-gray-500 text-sm">Orange County, CA</p>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-medium text-white text-sm uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-light">
            © {currentYear} DesignedbyTD Studio. All rights reserved.
          </p>

          <a
            href="#hero"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
