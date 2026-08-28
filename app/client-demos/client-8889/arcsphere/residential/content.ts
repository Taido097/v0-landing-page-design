export type ResidentialService = {
  number: string
  title: string
  description: string
  image: string
}

export type ResidentialProcessStep = {
  number: string
  title: string
}

export const residentialServices: ResidentialService[] = [
  {
    number: '01',
    title: 'CUSTOM HOMES',
    description: 'Bespoke homes designed around lifestyle, site, and long-term goals.',
    image: '/client-8889/residential/house-2-custom-4k.webp',
  },
  {
    number: '02',
    title: 'ADDITIONS & MAJOR REMODELS',
    description: 'Thoughtful expansions and transformations coordinated with the existing home.',
    image: '/client-8889/projects/minimalist-apartment-interior.webp',
  },
  {
    number: '03',
    title: 'ADUs',
    description: 'Detached, attached, garage conversion, JADU, and other accessory dwelling unit solutions.',
    image: '/nguyen-service-images/site-planning.jpg',
  },
  {
    number: '04',
    title: 'MULTIFAMILY / TOWNHOMES / CONDOS',
    description: 'Residential projects balancing livability, density, efficiency, and community requirements.',
    image: '/client-8889/residential/house-1.webp',
  },
  {
    number: '05',
    title: 'STRUCTURAL ENGINEERING',
    description: 'Structural coordination for new homes, additions, remodels, and residential modifications.',
    image: '/nguyen-service-images/structural-engineering.jpg',
  },
  {
    number: '06',
    title: 'MEP + TITLE 24',
    description: 'Mechanical, electrical, plumbing, and California energy-code coordination where applicable.',
    image: '/nguyen-service-images/mep-engineering.jpg',
  },
  {
    number: '07',
    title: 'PERMITTING',
    description: 'Permit-document coordination and city submittal support from design through review.',
    image: '/nguyen-service-images/permit-services.jpg',
  },
  {
    number: '08',
    title: 'PLAN-CHECK SUPPORT',
    description: 'Responsive support for agency comments, corrections, and approval coordination.',
    image: '/nguyen-service-images/code-energy-compliance.jpg',
  },
]

export const processSteps: ResidentialProcessStep[] = [
  { number: '01', title: 'Discovery & Site Review' },
  { number: '02', title: 'Design & Engineering' },
  { number: '03', title: 'Documentation' },
  { number: '04', title: 'Permitting' },
  { number: '05', title: 'Plan-Check & Approval' },
  { number: '06', title: 'Construction Support' },
]

export const scopeItems = [
  'Architecture',
  'Structural Engineering',
  'MEP Engineering',
  'Title 24 Coordination',
  'Permitting',
  'Plan-Check Support',
]

export const projectStrip = [
  { title: 'Custom Residence', image: '/client-8889/residential/house-2-custom-4k.webp' },
  { title: 'Major Remodel', image: '/client-8889/projects/minimalist-apartment-interior.webp' },
  { title: 'Residential Addition', image: '/nguyen-service-images/architectural-design.jpg' },
  { title: 'Garden ADU', image: '/nguyen-service-images/site-planning.jpg' },
  { title: 'Multifamily Residence', image: '/client-8889/residential/house-1.webp' },
]
