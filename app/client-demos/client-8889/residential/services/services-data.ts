// Content model for the eight residential service detail pages.
// These pages are native Next.js/CSS and reuse the NGUYEN Residential design system.

export interface ServiceGroup {
  label: string;
  items: string[];
}

export interface ServiceDetail {
  slug: string;
  num: string;
  title: string; // display title (uppercase)
  subtitle?: string;
  intro: string;
  hero: string; // public path
  groups: ServiceGroup[];
  process: string[];
  cta: string;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'custom-homes',
    num: '01',
    title: 'Custom Homes',
    subtitle: 'Designed around your site, lifestyle & vision.',
    intro:
      'NGUYEN provides coordinated architecture, engineering, and permitting for new custom residences and major residential projects — one team from first conversation through approval.',
    hero: '/client-8889/residential/svc-01-custom-homes.jpg',
    groups: [
      { label: 'Service Types', items: ['New Custom Residences', 'Luxury + Estate Homes', 'Additions + Major Remodels'] },
      { label: 'Engineering Support', items: ['Structural Engineering', 'MEP + Title 24', 'Permit Processing'] },
    ],
    process: ['Consultation', 'Site / Feasibility Review', 'Concept Design', 'Architecture + Engineering', 'Permit Submittal', 'Plan Check + Approval'],
    cta: 'Start Your Project',
  },
  {
    slug: 'additions-remodels',
    num: '02',
    title: 'Additions & Major Remodels',
    subtitle: 'Expand and rework your existing home.',
    intro:
      'NGUYEN helps expand and rework existing homes — coordinating architectural design, structural changes, engineering, and permit-ready documentation into one clear process.',
    hero: '/client-8889/residential/svc-02-additions-remodels.jpg',
    groups: [
      { label: 'Scope', items: ['Home Additions', 'Major Interior Remodels', 'Exterior / Façade Updates', 'Layout Reconfiguration', 'Structural Modifications'] },
      { label: 'Engineering Support', items: ['Structural Engineering', 'MEP Coordination', 'Title 24', 'Permit Processing'] },
    ],
    process: ['Existing Conditions Review', 'Design Development', 'Structural / Engineering Coordination', 'Permit Documents', 'Plan Check'],
    cta: 'Plan Your Remodel',
  },
  {
    slug: 'adus',
    num: '03',
    title: 'Accessory Dwelling Units',
    subtitle: 'Detached · Attached · Garage Conversion',
    intro:
      'NGUYEN provides coordinated ADU design from early site study through engineering and permitting — a practical path to added space, flexibility, and value.',
    hero: '/client-8889/residential/svc-03-adus.jpg',
    groups: [
      { label: 'ADU Types', items: ['Detached ADUs', 'Attached ADUs', 'Garage Conversions'] },
      { label: "What's Included", items: ['Site Evaluation + Feasibility', 'Concept Design + Floor Plans', 'Architectural Design', 'Structural Engineering', 'MEP Design', 'Title 24 Compliance', 'Permit Submittal + Plan Check'] },
    ],
    process: ['Site Study', 'Architecture', 'Structural', 'MEP + Title 24', 'Permit Submittal'],
    cta: 'Start Your ADU',
  },
  {
    slug: 'multifamily',
    num: '04',
    title: 'Townhomes + Condominiums',
    subtitle: 'Efficient density, thoughtfully planned.',
    intro:
      'NGUYEN designs townhomes, condominiums, and multifamily residential development — balancing efficient density with coordinated site planning, unit planning, and engineering.',
    hero: '/client-8889/residential/svc-04-multifamily.jpg',
    groups: [
      {
        label: 'Key Areas',
        items: [
          'Site Planning — Access, Parking, Open Space',
          'Unit Design — Efficient, Marketable Layouts',
          'Code — Life Safety + Accessibility',
          'Engineering — Structural + MEP Coordination',
        ],
      },
    ],
    process: ['Feasibility', 'Site Planning', 'Unit Planning', 'Architecture', 'Engineering', 'Permitting'],
    cta: 'Discuss Your Development',
  },
  {
    slug: 'structural',
    num: '05',
    title: 'Structural Engineering',
    subtitle: 'Coordinated with the architecture.',
    intro:
      'Structural systems are coordinated directly with the architectural design for residential projects — keeping structure, space, and detailing aligned from concept through permit.',
    hero: '/client-8889/residential/svc-05-structural.jpg',
    groups: [
      { label: 'Project Types', items: ['New Homes', 'Additions', 'Major Remodels', 'ADUs', 'Multifamily / Townhomes'] },
      { label: 'Service Scope', items: ['Structural Framing Design', 'Foundation Coordination', 'Structural Modifications', 'Architectural / Structural Coordination', 'Permit Documentation'] },
    ],
    process: ['Existing / Proposed Conditions', 'Structural Analysis', 'Design', 'Coordination', 'Permit Documents'],
    cta: 'Start Engineering',
  },
  {
    slug: 'mep-title24',
    num: '06',
    title: 'MEP + Title 24',
    subtitle: 'Systems coordinated with design.',
    intro:
      'Coordinated mechanical, electrical, plumbing, and energy compliance support for residential projects — integrated with the architecture and structural design rather than added on.',
    hero: '/client-8889/residential/svc-06-mep-title24.jpg',
    groups: [
      { label: 'Scope', items: ['Mechanical Coordination', 'Electrical Coordination', 'Plumbing Coordination', 'Title 24 Compliance', 'Energy / Code Coordination'] },
      { label: 'Integration', items: ['Coordinated with Architecture', 'Coordinated with Structural Design'] },
    ],
    process: ['Project Review', 'System Coordination', 'Title 24 / Code Review', 'Documentation', 'Permit Coordination'],
    cta: 'Coordinate Your Project',
  },
  {
    slug: 'permitting',
    num: '07',
    title: 'Permitting',
    subtitle: 'From completed design toward approval.',
    intro:
      'NGUYEN coordinates the permit process to help move residential projects from completed design toward approval — keeping submittals, agencies, and revisions organized.',
    hero: '/client-8889/residential/svc-07-permitting.jpg',
    groups: [
      { label: 'Scope', items: ['Permit Package Preparation', 'Submittal Coordination', 'Agency Coordination', 'Plan Check Responses', 'Revision Coordination'] },
    ],
    process: ['Permit-Ready Documents', 'Submittal', 'Agency Review', 'Corrections', 'Approval'],
    cta: 'Start Your Permit',
  },
  {
    slug: 'plan-check',
    num: '08',
    title: 'Plan-Check Support',
    subtitle: 'Support through the approval process.',
    intro:
      'NGUYEN helps coordinate responses to plan-check comments and revisions during the approval process — a focused support service to keep a project moving.',
    hero: '/client-8889/residential/svc-08-plan-check.jpg',
    groups: [
      { label: 'Scope', items: ['Plan-Check Comment Review', 'Architectural Revisions', 'Engineering Coordination', 'Resubmittal Support', 'Agency Coordination'] },
    ],
    process: ['Receive Comments', 'Review', 'Coordinate Revisions', 'Update Documents', 'Resubmit', 'Continue Through Approval'],
    cta: 'Get Plan-Check Support',
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
