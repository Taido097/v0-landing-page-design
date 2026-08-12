import { notFound } from 'next/navigation';
import { AlexKabiruDemo } from '@/components/alex-kabiru-demo';
import { BeanroCoffeeDemo } from '@/components/beanro-coffee-demo';
import { PhotographyEditorialDemo } from '@/components/photography-editorial-demo';
import { RestaurantQitchenDemo } from '@/components/restaurant-qitchen-demo';
import { SalonSpaDemo } from '@/components/salon-spa-demo';

const slugs = [
  'photography-studio',
  'auto-repair-shop',
  'salon-spa',
  'restaurant-website',
  'minimal-portfolio',
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

  if (slug === 'photography-studio') {
    return <PhotographyEditorialDemo />;
  }

  if (slug === 'auto-repair-shop') {
    return <BeanroCoffeeDemo />;
  }

  if (slug === 'salon-spa') {
    return <SalonSpaDemo />;
  }

  if (slug === 'minimal-portfolio') {
    return <AlexKabiruDemo />;
  }

  return <RestaurantQitchenDemo />;
}
