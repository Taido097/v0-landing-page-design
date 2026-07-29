import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Images,
  LayoutTemplate,
  Newspaper,
  ShoppingBag,
  UtensilsCrossed,
} from 'lucide-react';

const products = [
  {
    title: 'Custom Website',
    description: 'A polished website built around your business and brand.',
    icon: LayoutTemplate,
  },
  {
    title: 'eCommerce Store',
    description: 'Product pages, online checkout, and a simple shopping experience.',
    icon: ShoppingBag,
  },
  {
    title: 'Booking System',
    description: 'Let customers request appointments or reserve a time online.',
    icon: CalendarDays,
  },
  {
    title: 'Restaurant Website',
    description: 'Show your menu, hours, location, and reservation options.',
    icon: UtensilsCrossed,
  },
  {
    title: 'Blog Website',
    description: 'Publish updates, useful content, and business news with ease.',
    icon: Newspaper,
  },
  {
    title: 'Online Portfolio',
    description: 'Present your best work in a clean, visual layout.',
    icon: Images,
  },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="scroll-mt-24 border-y border-gray-200 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-gray-500">
              Website products
            </p>
            <h2 className="max-w-3xl text-4xl font-light leading-tight text-black sm:text-5xl lg:text-6xl">
              Built for the way your business works.
            </h2>
          </div>

          <p className="max-w-xl text-base font-light leading-7 text-gray-600 lg:justify-self-end">
            Choose the website type you need. Every project is customized to fit your business.
          </p>
        </div>

        <div className="grid border-l border-t border-gray-200 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;

            return (
              <div
                key={product.title}
                className="group min-h-52 border-b border-r border-gray-200 p-7 transition-colors hover:bg-gray-50 sm:p-8"
              >
                <Icon className="mb-10 h-6 w-6 stroke-[1.5] text-black" />
                <h3 className="mb-3 text-xl font-medium text-black">{product.title}</h3>
                <p className="max-w-sm text-sm font-light leading-6 text-gray-600">
                  {product.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-light text-gray-600">
            Not sure which option fits? Tell me what your business needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-black transition-all hover:gap-3"
          >
            Start your website
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
