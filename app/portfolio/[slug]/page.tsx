import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LaptopMockup } from '@/components/laptop-mockup';

const projects = [
  {
    id: 1,
    slug: 'photography-studio',
    title: 'Photography Studio',
    category: 'Portfolio Website',
    description: 'Beautiful portfolio site for a photography business with image gallery and booking system.',
    image: '/portfolio-photography.jpg',
    client: 'Sarah Chen Photography',
    duration: '3 weeks',
    year: '2024',
    challenge: 'Sarah needed a website that would showcase her photography work in a visually stunning way while also making it easy for potential clients to book sessions and view pricing.',
    solution: 'We designed a minimalist portfolio with full-screen image galleries, an integrated booking system, and a client portal for proofing and ordering prints.',
    results: [
      { metric: '150%', label: 'Increase in bookings' },
      { metric: '3x', label: 'More inquiries' },
      { metric: '45%', label: 'Higher engagement' },
    ],
    testimonial: {
      quote: "My new website has completely transformed my business. I'm booking more clients than ever and the booking system saves me hours every week.",
      author: 'Sarah Chen',
      role: 'Owner, Sarah Chen Photography',
    },
    features: ['Custom gallery system', 'Online booking', 'Client portal', 'Mobile responsive', 'SEO optimized'],
  },
  {
    id: 2,
    slug: 'auto-repair-shop',
    title: 'Auto Repair Shop',
    category: 'Service Business',
    description: 'Complete web solution for an auto repair business with service listings and appointment booking.',
    image: '/portfolio-auto-repair.jpg',
    client: 'Mike\'s Auto Care',
    duration: '2 weeks',
    year: '2024',
    challenge: 'Mike\'s Auto Care was losing customers to competitors with better online presence. They needed a professional website that would build trust and make scheduling easy.',
    solution: 'We built a clean, professional website with clear service listings, transparent pricing, online appointment scheduling, and customer reviews integration.',
    results: [
      { metric: '200%', label: 'More appointments' },
      { metric: '85%', label: 'Online bookings' },
      { metric: '4.9', label: 'Google rating' },
    ],
    testimonial: {
      quote: "The new website has been a game-changer. Customers can book appointments online 24/7, and we've seen a huge increase in new customers finding us through Google.",
      author: 'Mike Rodriguez',
      role: 'Owner, Mike\'s Auto Care',
    },
    features: ['Service catalog', 'Online scheduling', 'Review integration', 'Location maps', 'Mobile friendly'],
  },
  {
    id: 3,
    slug: 'salon-spa',
    title: 'Salon & Spa',
    category: 'Beauty Business',
    description: 'Modern website for a beauty salon with staff profiles, services, and online booking integration.',
    image: '/portfolio-salon.jpg',
    client: 'Luxe Beauty Lounge',
    duration: '4 weeks',
    year: '2023',
    challenge: 'Luxe Beauty Lounge wanted to position themselves as a premium destination. Their old website didn\'t reflect the quality of their services or make booking convenient.',
    solution: 'We created an elegant, luxurious website with staff portfolios, detailed service menus, integrated booking with their existing system, and a gift card purchase feature.',
    results: [
      { metric: '120%', label: 'Revenue increase' },
      { metric: '60%', label: 'Repeat bookings' },
      { metric: '$15K', label: 'Gift card sales' },
    ],
    testimonial: {
      quote: "Our website finally matches the experience we provide in the salon. Clients constantly compliment how easy it is to book, and gift card sales have been incredible.",
      author: 'Jessica Park',
      role: 'Owner, Luxe Beauty Lounge',
    },
    features: ['Staff profiles', 'Service menu', 'Online booking', 'Gift cards', 'Instagram feed'],
  },
  {
    id: 4,
    slug: 'restaurant-website',
    title: 'Restaurant Website',
    category: 'Food & Beverage',
    description: 'Elegant restaurant site with menu showcase, reservations, and location integration.',
    image: '/portfolio-restaurant.jpg',
    client: 'Harvest Table Restaurant',
    duration: '3 weeks',
    year: '2023',
    challenge: 'Harvest Table needed a website that would showcase their farm-to-table concept and make it easy for diners to view menus, make reservations, and find the restaurant.',
    solution: 'We designed a warm, inviting website with beautiful food photography, easy-to-navigate menus, OpenTable integration, and prominent location/hours information.',
    results: [
      { metric: '180%', label: 'More reservations' },
      { metric: '40%', label: 'Larger parties' },
      { metric: '5x', label: 'Event inquiries' },
    ],
    testimonial: {
      quote: "The website captures the essence of our restaurant perfectly. Reservations are up significantly, and we're getting more private event inquiries than ever.",
      author: 'Chef Marcus Webb',
      role: 'Owner, Harvest Table',
    },
    features: ['Digital menus', 'Reservation system', 'Event booking', 'Photo gallery', 'Social integration'],
  },
];

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors text-sm font-light"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Laptop Mockup */}
            <LaptopMockup
              image={project.image}
              alt={project.title}
              projectTitle={project.title}
            />

            {/* Project Info */}
            <div className="space-y-8">
              <div>
                <p className="text-sm text-gray-600 uppercase tracking-wider font-medium mb-3">
                  {project.category}
                </p>
                <h1 className="text-5xl sm:text-6xl font-light text-black mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-gray-700 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wider mb-1">Client</p>
                  <p className="text-black font-light">{project.client}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-black font-light">{project.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wider mb-1">Year</p>
                  <p className="text-black font-light">{project.year}</p>
                </div>
              </div>

              {/* Features */}
              <div>
                <p className="text-sm text-gray-600 font-medium uppercase tracking-wider mb-3">Features</p>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 border border-gray-300 text-sm text-gray-700 font-light"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button
                asChild
                className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-base font-medium rounded-none"
              >
                <Link href="/contact">
                  Start Your Project <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-light text-black mb-4">The Challenge</h2>
              <p className="text-gray-700 font-light leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-3xl font-light text-black mb-4">Our Solution</h2>
              <p className="text-gray-700 font-light leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-black mb-12 text-center">Results</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.results.map((result, index) => (
              <div key={index} className="text-center p-8 border border-gray-200">
                <div className="text-5xl font-light text-black mb-2">{result.metric}</div>
                <p className="text-gray-600 font-light">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
            "{project.testimonial.quote}"
          </p>
          <div>
            <p className="font-medium">{project.testimonial.author}</p>
            <p className="text-gray-400 text-sm font-light">{project.testimonial.role}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-black mb-4">Ready for similar results?</h2>
          <p className="text-gray-700 font-light mb-8">
            Let us help you create a website that drives real business growth.
          </p>
          <Button
            asChild
            className="bg-black hover:bg-gray-800 text-white px-8 py-6 text-base font-medium rounded-none"
          >
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
