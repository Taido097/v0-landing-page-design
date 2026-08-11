import { notFound } from 'next/navigation';
import { InteractiveBusinessDemo } from '@/components/interactive-business-demo';
import { RestaurantQitchenDemo } from '@/components/restaurant-qitchen-demo';
import { SalonSpaDemo } from '@/components/salon-spa-demo';

const slugs = [
  'photography-studio',
  'auto-repair-shop',
  'salon-spa',
  'restaurant-website',
];

export async function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slugs.includes(slug)) {
    notFound();
  }

  if (slug === 'salon-spa') {
    return <SalonSpaDemo />;
  }

  if (slug === 'restaurant-website') {
    return <RestaurantQitchenDemo />;
  }

  return <InteractiveBusinessDemo slug={slug} />;
}
