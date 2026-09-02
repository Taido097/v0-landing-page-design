import ServiceDetailPage from '../[slug]/page';

export const metadata = {
  title: 'Accessory Dwelling Units — NGUYEN Architecture & Engineering',
  robots: { index: false, follow: false },
};

// The ADU page reuses the shared service-detail template (slug "adus"), which renders
// the "Three ADU Types" body. Kept as a thin, dedicated route so it can carry its own
// metadata; no tree rewriting here (that previously caused a duplicated caption).
export default async function AduPage() {
  return ServiceDetailPage({ params: Promise.resolve({ slug: 'adus' }) });
}
