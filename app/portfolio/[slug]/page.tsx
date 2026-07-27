import { notFound } from 'next/navigation';
import { InteractiveBusinessDemo } from '@/components/interactive-business-demo';

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

  return <InteractiveBusinessDemo slug={slug} />;
}
