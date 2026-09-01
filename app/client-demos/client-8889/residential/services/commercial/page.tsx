import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import ServiceDetailPage from '../[slug]/page';
import part1 from '../../../../../client-8889/main-footer-house/chunks/part1';
import part2 from '../../../../../client-8889/main-footer-house/chunks/part2';
import part3 from '../../../../../client-8889/main-footer-house/chunks/part3';
import part4 from '../../../../../client-8889/main-footer-house/chunks/part4';
import part5 from '../../../../../client-8889/main-footer-house/chunks/part5';
import part6 from '../../../../../client-8889/main-footer-house/chunks/part6';
import part7 from '../../../../../client-8889/main-footer-house/chunks/part7';
import part8 from '../../../../../client-8889/main-footer-house/chunks/part8';

const FOOTER_IMAGE = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8;
const FOOTER_IMAGE_SRC = `data:image/webp;base64,${FOOTER_IMAGE}`;

const OUR_SERVICES = [
  {
    title: 'ADU',
    href: '/client-demos/client-8889/residential/services/adus',
    image: '/client-8889/residential/svc-03-adus.jpg',
  },
  {
    title: 'Land Development',
    href: '/client-demos/client-8889/residential/services/land-development',
    image: '/client-8889/residential/svc-04-multifamily.jpg',
  },
  {
    title: 'Residential',
    href: '/client-demos/client-8889/residential',
    image: '/client-8889/residential/hero-home.png',
  },
  {
    title: 'Engineering',
    href: '/client-demos/client-8889/residential/services/engineering-approvals',
    image: '/client-8889/residential/detail/eng-01-structural-frame.jpg',
  },
];

const OUR_SERVICES_CSS = `
.nrd-related-services{margin-top:clamp(56px,7vw,96px);padding-bottom:clamp(56px,7vw,96px)}
.nrd-related-services h2{font-family:"Inter Display","Inter Display Placeholder","Inter",sans-serif;font-size:clamp(30px,3.4vw,48px);line-height:1.05;font-weight:400;letter-spacing:-.025em;color:#4f4742;margin:0 0 clamp(30px,3.8vw,48px)}
.nrd-related-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.nrd-related-card{display:block;color:inherit;text-decoration:none;min-width:0}
.nrd-related-img{aspect-ratio:1.58/1;overflow:hidden;background:#e7e0d5;border-radius:0}
.nrd-related-img img{display:block;width:100%;height:100%;object-fit:cover;border-radius:0;transition:transform .55s cubic-bezier(.22,1,.36,1)}
.nrd-related-card:hover .nrd-related-img img{transform:scale(1.025)}
.nrd-related-label{font-family:"Inter Display","Inter Display Placeholder","Inter",sans-serif;font-size:clamp(14px,1.15vw,17px);font-weight:400;line-height:1.3;color:#4f4742;margin:12px 0 0}
@media(max-width:820px){.nrd-related-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 16px}}
@media(max-width:520px){.nrd-related-grid{grid-template-columns:1fr}.nrd-related-img{aspect-ratio:16/10}}
`;

const FOOTER_MATCH_CSS = `
.nrd-commercial .nrd-marquee{margin:clamp(30px,4vw,56px) 0 clamp(20px,2.6vw,34px)}
.nrd-commercial .nrd-marquee-track span{
  font-family:"Inter Display","Inter Display Placeholder","Inter",sans-serif;
  font-size:clamp(64px,18vw,260px);
  line-height:.82;
  font-weight:800;
  letter-spacing:-.055em;
  text-transform:uppercase;
  color:#33302b;
}
.nrd-commercial .nrd-marquee-track span::after{color:#33302b}
.nrd-commercial .nrd-foot-img{background:#e7e0d5}
.nrd-commercial .nrd-foot-img img{opacity:1;visibility:visible;display:block;width:100%;height:100%;object-fit:cover}
`;

type FooterNodeProps = {
  children?: ReactNode;
  src?: string;
  alt?: string;
  [key: string]: unknown;
};

function replaceFooterImage(node: ReactNode): ReactNode {
  if (!isValidElement(node)) return node;

  const element = node as ReactElement<FooterNodeProps>;
  if (element.type === 'img') {
    return cloneElement(element, {
      src: FOOTER_IMAGE_SRC,
      alt: 'NGUYEN architecture',
    });
  }

  if (element.props.children === undefined) return element;

  return cloneElement(element, {
    children: Children.map(element.props.children, replaceFooterImage),
  });
}

function OurServicesSection() {
  return (
    <section className="nrd-shell nrd-related-services" aria-labelledby="commercial-our-services-title">
      <style dangerouslySetInnerHTML={{ __html: OUR_SERVICES_CSS }} />
      <h2 id="commercial-our-services-title">Our Services</h2>
      <div className="nrd-related-grid">
        {OUR_SERVICES.map((service) => (
          <a className="nrd-related-card" href={service.href} key={service.title}>
            <div className="nrd-related-img">
              <img src={service.image} alt={service.title} loading="lazy" />
            </div>
            <p className="nrd-related-label">{service.title}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export const metadata = {
  title: 'Commercial Design & Permit Solutions — NGUYEN Architecture & Engineering',
  robots: { index: false, follow: false },
};

export default async function CommercialPage() {
  const rendered = await ServiceDetailPage({
    params: Promise.resolve({ slug: 'commercial' }),
  });

  if (!isValidElement(rendered)) return rendered;

  const root = rendered as ReactElement<{ children?: ReactNode }>;
  const children = Children.toArray(root.props.children);
  const footerIndex = children.findIndex(
    (child) => isValidElement(child) && child.type === 'footer',
  );

  const footerStyle = (
    <style
      key="commercial-footer-match"
      dangerouslySetInnerHTML={{ __html: FOOTER_MATCH_CSS }}
    />
  );

  const nextChildren =
    footerIndex >= 0
      ? [
          ...children.slice(0, footerIndex),
          <OurServicesSection key="commercial-our-services" />,
          footerStyle,
          replaceFooterImage(children[footerIndex]),
          ...children.slice(footerIndex + 1),
        ]
      : [
          ...children,
          <OurServicesSection key="commercial-our-services" />,
          footerStyle,
        ];

  return cloneElement(root, { children: nextChildren });
}
