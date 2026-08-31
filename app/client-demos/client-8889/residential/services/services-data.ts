// Content model for the residential service detail pages.
// Native Next.js/CSS; reuses the NGUYEN Residential design system.
// Two services (Custom Homes, Townhomes + Condominiums) carry the full reference
// layout (approach/offer, columns, gallery, described process); the rest use a
// lighter subset of the same template.

export interface DetailItem {
  t: string; // title
  d?: string; // description
  icon?: string; // lucide icon name (see ICONS map in the page)
}

export interface DetailColumn {
  label: string;
  items: string[];
}

export interface GalleryShot {
  src: string;
  cat: string; // category (drives the filter chips)
  alt: string;
  label?: string; // caption shown on the card (falls back to cat)
}

export interface ServiceDetail {
  slug: string;
  num: string;
  title: string;
  kicker?: string; // hero eyebrow override (defaults to "Residential Service · {num}")
  subtitle?: string;
  intro: string;
  hero: string;
  approach?: DetailItem[]; // "Our Approach" icon columns
  offer?: DetailItem[]; // "What We Offer" icon grid
  columns?: DetailColumn[]; // checklist columns
  gallery?: GalleryShot[]; // "Project Gallery" (filters derived from cat)
  process: DetailItem[]; // numbered process steps
  ctaHeadline: string;
  ctaBody?: string;
  cta: string; // button label
}

const D = '/client-8889/residential/detail';
const S = '/client-8889/residential';

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'custom-homes',
    num: '01',
    title: 'Custom Homes',
    subtitle: 'Designed around your site, lifestyle & vision.',
    intro:
      'We design and engineer custom homes that reflect how you live. From first concept through permit approval, our team coordinates architecture, engineering, and documentation with precision and care.',
    hero: `${D}/hero-custom-homes.jpg`,
    offer: [
      { t: 'New Custom Residences', d: 'Timeless architecture shaped around the site and the client’s goals.', icon: 'Home' },
      { t: 'Luxury + Estate Homes', d: 'Elevated residential design with coordinated technical development.', icon: 'Gem' },
      { t: 'Additions + Major Remodels', d: 'Seamless expansions and significant home transformations.', icon: 'Hammer' },
      { t: 'Structural Engineering', d: 'Structural coordination for new residential construction and major modifications.', icon: 'Ruler' },
      { t: 'MEP + Title 24', d: 'Mechanical, electrical, plumbing, and California energy-code coordination.', icon: 'Zap' },
      { t: 'Permit Processing', d: 'Permit-ready documentation, submittal, and plan-check support.', icon: 'FileCheck' },
    ],
    gallery: [
      { src: `${D}/ch-exterior-01.jpg`, cat: 'Exteriors', alt: 'Custom home exterior at dusk' },
      { src: `${S}/svc-01-custom-homes.jpg`, cat: 'Exteriors', alt: 'Custom stone-and-glass residence' },
      { src: `${D}/ch-interior-01.jpg`, cat: 'Interiors', alt: 'Custom home interior' },
      { src: `${D}/ch-exterior-02.jpg`, cat: 'Exteriors', alt: 'Custom home exterior elevation' },
      { src: `${S}/svc-02-additions-remodels.jpg`, cat: 'Interiors', alt: 'Open-plan living and kitchen' },
      { src: `${D}/ch-interior-02.jpg`, cat: 'Interiors', alt: 'Custom home interior detail' },
    ],
    process: [
      { t: 'Consultation', d: 'Discuss goals, scope, site, budget, timeline, and requirements.' },
      { t: 'Site / Feasibility Review', d: 'Review site conditions, zoning, project constraints, and development potential.' },
      { t: 'Concept Design', d: 'Develop layout, massing, architectural direction, and core design ideas.' },
      { t: 'Architecture + Engineering', d: 'Coordinate architectural, structural, MEP, and code documentation.' },
      { t: 'Permit Submittal', d: 'Prepare and submit the permit package.' },
      { t: 'Plan Check + Approval', d: 'Respond to plan-check comments and coordinate revisions through approval.' },
    ],
    ctaHeadline: "Let’s build your vision together.",
    cta: 'Start Your Project',
  },
  {
    slug: 'additions-remodels',
    num: '02',
    title: 'Additions & Major Remodels',
    subtitle: 'Expand and rework your existing home.',
    intro:
      'NGUYEN helps expand and rework existing homes — coordinating architectural design, structural changes, engineering, and permit-ready documentation into one clear process.',
    hero: `${S}/svc-02-additions-remodels.jpg`,
    columns: [
      { label: 'Scope', items: ['Home Additions', 'Major Interior Remodels', 'Exterior / Façade Updates', 'Layout Reconfiguration', 'Structural Modifications'] },
      { label: 'Engineering Support', items: ['Structural Engineering', 'MEP Coordination', 'Title 24', 'Permit Processing'] },
    ],
    gallery: [
      { src: `${D}/ar-01-rear-addition.jpg`, cat: 'Additions', label: 'Rear Addition', alt: 'Rear addition with open living space' },
      { src: `${D}/ar-03-kitchen.jpg`, cat: 'Remodels', label: 'Kitchen Remodel', alt: 'Kitchen remodel' },
      { src: `${D}/ar-02-front-facade.jpg`, cat: 'Exteriors', label: 'Front Façade Update', alt: 'Front façade update' },
      { src: `${D}/ar-07-second-story.jpg`, cat: 'Additions', label: 'Second-Story Addition', alt: 'Second-story addition' },
      { src: `${D}/ar-04-primary-bath.jpg`, cat: 'Remodels', label: 'Primary Bath Remodel', alt: 'Primary bath remodel' },
      { src: `${D}/ar-05-outdoor-living.jpg`, cat: 'Additions', label: 'Outdoor Living Addition', alt: 'Outdoor living addition' },
      { src: `${D}/ar-08-whole-home.jpg`, cat: 'Remodels', label: 'Whole-Home Remodel', alt: 'Whole-home remodel' },
      { src: `${D}/ar-06-garage-conversion.jpg`, cat: 'Additions', label: 'Garage Conversion', alt: 'Garage conversion' },
      { src: `${D}/ar-10-interior-remodel.jpg`, cat: 'Remodels', label: 'Interior Remodel', alt: 'Interior remodel' },
      { src: `${D}/ar-09-adu-guest-house.jpg`, cat: 'Additions', label: 'ADU / Guest House', alt: 'ADU / guest house addition' },
    ],
    process: [
      { t: 'Existing Conditions Review' },
      { t: 'Design Development' },
      { t: 'Structural / Engineering Coordination' },
      { t: 'Permit Documents' },
      { t: 'Plan Check' },
    ],
    ctaHeadline: "Let’s plan your remodel.",
    cta: 'Plan Your Remodel',
  },
  {
    slug: 'adus',
    num: '03',
    title: 'Accessory Dwelling Units',
    subtitle: 'Detached · Attached · Garage Conversion',
    intro:
      'NGUYEN provides coordinated ADU design from early site study through engineering and permitting — a practical path to added space, flexibility, and value.',
    hero: `${D}/adu-04-golden-hour.jpg`,
    columns: [
      { label: 'ADU Types', items: ['Detached ADUs', 'Attached ADUs', 'Garage Conversions'] },
      { label: "What's Included", items: ['Site Evaluation + Feasibility', 'Concept Design + Floor Plans', 'Architectural Design', 'Structural Engineering', 'MEP Design', 'Title 24 Compliance', 'Permit Submittal + Plan Check'] },
    ],
    gallery: [
      { src: `${D}/adu-01-backyard.jpg`, cat: 'Exteriors', label: 'Backyard Guest House', alt: 'Backyard guest-house ADU' },
      { src: `${D}/adu-07-living-space.jpg`, cat: 'Interiors', label: 'Living Space', alt: 'ADU interior living space' },
      { src: `${D}/adu-03-glass-corner.jpg`, cat: 'Exteriors', label: 'Glass Corner', alt: 'ADU glass-corner exterior' },
      { src: `${D}/adu-10-living-kitchen.jpg`, cat: 'Interiors', label: 'Living + Kitchen', alt: 'ADU living and kitchen' },
      { src: `${D}/adu-02-garden-path.jpg`, cat: 'Exteriors', label: 'Garden Path', alt: 'ADU garden-path exterior' },
      { src: `${D}/adu-08-bedroom.jpg`, cat: 'Interiors', label: 'Bedroom', alt: 'ADU bedroom' },
      { src: `${D}/adu-04-golden-hour.jpg`, cat: 'Exteriors', label: 'Golden Hour', alt: 'ADU exterior at golden hour' },
      { src: `${D}/adu-05-studio-retreat.jpg`, cat: 'Interiors', label: 'Studio Retreat', alt: 'ADU studio retreat' },
      { src: `${D}/adu-09-bathroom.jpg`, cat: 'Interiors', label: 'Bathroom', alt: 'ADU bathroom' },
      { src: `${D}/adu-06-warm-studio.jpg`, cat: 'Interiors', label: 'Warm Studio', alt: 'ADU warm studio interior' },
    ],
    process: [
      { t: 'Site Study' },
      { t: 'Architecture' },
      { t: 'Structural' },
      { t: 'MEP + Title 24' },
      { t: 'Permit Submittal' },
    ],
    ctaHeadline: "Let’s start your ADU.",
    cta: 'Start Your ADU',
  },
  {
    slug: 'multifamily',
    num: '04',
    title: 'Townhomes + Condominiums',
    subtitle: 'Smart density. Thoughtful design.',
    intro:
      'We help plan and design efficient residential communities with coordinated architecture, engineering, site planning, and permitting.',
    hero: `${D}/hero-townhomes.jpg`,
    approach: [
      { t: 'Site Planning', d: 'Access, parking, open space, and coordinated site design.', icon: 'Map' },
      { t: 'Unit Design', d: 'Efficient, marketable layouts that support livability and project goals.', icon: 'LayoutTemplate' },
      { t: 'Code', d: 'Life safety, accessibility, and code coordination.', icon: 'ShieldCheck' },
      { t: 'Engineering', d: 'Structural + MEP coordination integrated with the architectural design.', icon: 'Wrench' },
    ],
    columns: [
      { label: 'Project Types', items: ['Townhomes', 'Condominiums', 'Multifamily Housing', 'Small Infill Developments'] },
      { label: 'Feasibility & Site Planning', items: ['Zoning Analysis', 'Site Feasibility Review', 'Density + Unit-Yield Studies', 'Access, Parking, Open Space', 'Grading + Utilities Coordination'] },
      { label: 'Engineering Coordination', items: ['Structural Engineering', 'MEP Design & Coordination', 'Civil / Grading Coordination', 'Title 24 Compliance', 'Code + Life Safety'] },
      { label: 'Permit & Project Support', items: ['Permit-Ready Documents', 'Permit Submittal', 'Plan Check Responses', 'Agency Coordination', 'Project Support Through Approval'] },
    ],
    gallery: [
      { src: `${D}/cm-01-multifamily-exterior.jpg`, cat: 'Multifamily', label: 'Multifamily Exterior', alt: 'Modern multifamily exterior' },
      { src: `${D}/cm-02-townhome-complex.jpg`, cat: 'Townhomes', label: 'Townhome Complex', alt: 'Townhome complex exterior' },
      { src: `${D}/cm-03-condo-building.jpg`, cat: 'Condos', label: 'Condominium Building', alt: 'Condominium building exterior' },
      { src: `${D}/cm-07-condo-living.jpg`, cat: 'Interiors', label: 'Condo Living', alt: 'Condo interior living space' },
      { src: `${D}/cm-04-courtyard.jpg`, cat: 'Multifamily', label: 'Courtyard', alt: 'Courtyard between buildings' },
      { src: `${D}/cm-06-condo-lobby.jpg`, cat: 'Condos', label: 'Condominium Lobby', alt: 'Condominium lobby' },
      { src: `${D}/cm-08-condo-kitchen.jpg`, cat: 'Interiors', label: 'Condo Kitchen', alt: 'Condo kitchen interior' },
      { src: `${D}/cm-05-common-area.jpg`, cat: 'Multifamily', label: 'Common Area', alt: 'Multifamily common area' },
      { src: `${D}/cm-09-condo-bath.jpg`, cat: 'Interiors', label: 'Condo Bath', alt: 'Condo bathroom interior' },
      { src: `${D}/cm-10-rooftop-amenity.jpg`, cat: 'Multifamily', label: 'Rooftop Amenity', alt: 'Rooftop amenity space' },
    ],
    process: [
      { t: 'Feasibility', d: 'Understand goals, budget, site constraints, and development potential.' },
      { t: 'Site Planning', d: 'Analyze access, parking, open space, utilities, and development opportunities.' },
      { t: 'Unit Planning', d: 'Develop efficient residential layouts and coordinated unit concepts.' },
      { t: 'Architecture', d: 'Create architecture that balances form, function, code, and community.' },
      { t: 'Engineering', d: 'Coordinate structural, MEP, Title 24, civil/grading, and related documentation.' },
      { t: 'Permitting', d: 'Coordinate permit submittal, plan check, revisions, and approval support.' },
    ],
    ctaHeadline: "Let’s build better communities.",
    ctaBody:
      "Whether you’re planning a townhome development, condominium project, or multifamily community, our team is ready to help move it forward.",
    cta: 'Discuss Your Project',
  },
  {
    slug: 'engineering-approvals',
    num: '05',
    title: 'Engineering & Approvals',
    subtitle: 'Structural · MEP + Title 24 · Permitting · Plan-Check',
    intro:
      'NGUYEN coordinates the technical side of residential projects — structural and MEP engineering, Title 24, permitting, and plan-check support — aligned with the architectural design from documentation through approval.',
    hero: `${D}/eng-01-structural-frame.jpg`,
    columns: [
      { label: 'Structural Engineering', items: ['Structural Framing Design', 'Foundation Coordination', 'Structural Modifications', 'Permit Documentation'] },
      { label: 'MEP + Title 24', items: ['Mechanical Coordination', 'Electrical Coordination', 'Plumbing Coordination', 'Title 24 Compliance'] },
      { label: 'Permitting', items: ['Permit-Ready Documents', 'Submittal Coordination', 'Agency Coordination', 'Revision Coordination'] },
      { label: 'Plan-Check Support', items: ['Plan-Check Comment Review', 'Architectural Revisions', 'Engineering Coordination', 'Resubmittal Support'] },
    ],
    gallery: [
      { src: `${D}/eng-01-structural-frame.jpg`, cat: 'Structural', label: 'Structural Framing', alt: 'Structural frame construction' },
      { src: `${D}/eng-04-blueprint.jpg`, cat: 'Plans & Projects', label: 'Blueprint Studio', alt: 'Blueprint studio' },
      { src: `${D}/eng-09-cutaway-mep.jpg`, cat: 'MEP', label: 'MEP Systems', alt: 'Cutaway house MEP systems' },
      { src: `${D}/eng-05-model-plans.jpg`, cat: 'Plans & Projects', label: 'Model + Plans', alt: 'Model and plans workspace' },
      { src: `${D}/eng-08-exploded-house.jpg`, cat: 'Structural', label: 'Structural Study', alt: 'Exploded house visualization' },
      { src: `${D}/eng-06-hvac.jpg`, cat: 'MEP', label: 'Mechanical Room', alt: 'HVAC utility room' },
      { src: `${D}/eng-02-drafting.jpg`, cat: 'Plans & Projects', label: 'Drafting', alt: 'Architectural drafting workspace' },
      { src: `${D}/eng-07-model-studio.jpg`, cat: 'Plans & Projects', label: 'Model Studio', alt: 'Architectural model studio' },
      { src: `${D}/eng-03-studio-desk.jpg`, cat: 'Plans & Projects', label: 'Studio Desk', alt: 'Architectural studio desk' },
      { src: `${D}/eng-10-villa-entrance.jpg`, cat: 'Plans & Projects', label: 'Completed Project', alt: 'Modern villa entrance' },
    ],
    process: [
      { t: 'Existing / Proposed Conditions' },
      { t: 'Structural + MEP Design' },
      { t: 'Architectural Coordination' },
      { t: 'Permit Documents' },
      { t: 'Submittal' },
      { t: 'Plan Check + Approval' },
    ],
    ctaHeadline: "Let’s coordinate the technical work.",
    cta: 'Start Engineering',
  },
  {
    slug: 'commercial',
    num: '06',
    kicker: 'NGUYEN · Commercial',
    title: 'Commercial',
    subtitle: 'Architecture, engineering & permitting for commercial projects.',
    intro:
      'NGUYEN provides coordinated architecture, engineering, Title 24, and permitting for commercial projects — from tenant improvements and office build-outs to mixed-use — coordinated from concept through approval.',
    hero: `${D}/cm-01-multifamily-exterior.jpg`,
    columns: [
      { label: 'Project Types', items: ['Office / Workplace', 'Retail / Restaurant', 'Tenant Improvements', 'Mixed-Use'] },
      { label: 'Services', items: ['Architecture', 'Structural Engineering', 'MEP + Title 24', 'Permitting & Plan Check'] },
    ],
    process: [
      { t: 'Consultation' },
      { t: 'Feasibility / Existing Conditions' },
      { t: 'Design' },
      { t: 'Engineering Coordination' },
      { t: 'Permit Submittal' },
      { t: 'Plan Check + Approval' },
    ],
    ctaHeadline: "Let’s build your commercial project.",
    cta: 'Start Your Project',
  },
  {
    slug: 'land-development',
    num: '07',
    kicker: 'NGUYEN · Land Development',
    title: 'Land Development',
    subtitle: 'Feasibility, site planning & entitlement support.',
    intro:
      'NGUYEN supports land development with feasibility, site planning, and entitlement coordination — aligning zoning, access, and engineering early so projects can move toward approval.',
    hero: `${S}/svc-04-multifamily.jpg`,
    columns: [
      { label: 'Scope', items: ['Feasibility Studies', 'Zoning / Entitlement Review', 'Site Planning', 'Density + Yield Studies'] },
      { label: 'Coordination', items: ['Civil / Grading', 'Access & Parking', 'Utilities', 'Permitting'] },
    ],
    process: [
      { t: 'Feasibility' },
      { t: 'Site Analysis' },
      { t: 'Planning' },
      { t: 'Engineering Coordination' },
      { t: 'Entitlement / Permitting' },
    ],
    ctaHeadline: "Let’s evaluate your site.",
    cta: 'Discuss Your Site',
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
