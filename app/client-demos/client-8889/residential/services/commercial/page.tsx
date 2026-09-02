import ServiceDetailPage from '../[slug]/page';

export const metadata = {
  title: 'Commercial Design & Permit Solutions — NGUYEN Architecture & Engineering',
  robots: { index: false, follow: false },
};

// The Commercial page reuses the shared service-detail template (slug "commercial"),
// which renders the commercial body, the single "Our Services" section, and the footer.
// Kept as a thin, dedicated route for its metadata; no tree rewriting (that previously
// injected a duplicate "Our Services" section).
export default async function CommercialPage() {
  return ServiceDetailPage({ params: Promise.resolve({ slug: 'commercial' }) });
}
