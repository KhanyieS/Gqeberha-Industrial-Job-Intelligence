import { Job, JobCategory, JobStatus } from './types';

export const USER_PROFILE_CV = `
  Candidate: Experienced Industrial Worker
  Location: Port Elizabeth / Gqeberha
  Skills: Forklift Operation (Counterbalance & Reach Truck License), Inventory Management (SAP basics), Health & Safety (OSHA), Heavy Lifting.
  Experience: 3 years at huge distribution centers.
  Education: Matric Certificate.
`;

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Forklift Operator - Night Shift',
    company: 'VWSA (via Workforce)',
    location: 'Uitenhage, Gqeberha',
    postedDate: '2025-05-10',
    salary: 'R85/hr',
    description: 'Certified forklift operator needed for night shift in automotive warehouse. Must have valid license and clean safety record. Moving engine parts and pallets.',
    category: JobCategory.TECHNICAL,
    source: 'Workforce Agency',
    link: '#',
    aiAnalysis: {
      fraudScore: 5,
      matchScore: 0,
      reasoning: '',
      isAnalyzed: false
    }
  },
  {
    id: '2',
    title: 'General Warehouse Assistant',
    company: 'Aspen Pharmacare',
    location: 'Neave Industrial',
    postedDate: '2025-05-11',
    salary: 'R12,000 p.m.',
    description: 'Assisting with packing pharmaceutical products. Strict hygiene standards. Matric required. No criminal record.',
    category: JobCategory.INVENTORY,
    source: 'CareerJunction',
    link: '#',
    aiAnalysis: {
      fraudScore: 2,
      matchScore: 0,
      reasoning: '',
      isAnalyzed: false
    }
  },
  {
    id: '3',
    title: 'URGENT HIRING: WAREHOUSE MANAGER',
    company: 'Global Logistics Inc',
    location: 'Port Elizabeth Central',
    postedDate: '2025-05-12',
    salary: 'R45,000 p.m.',
    description: 'Immediate start. Send WhatsApp to 071-XXX-XXXX. R500 administration fee required for background checks before interview. Earn easy money.',
    category: JobCategory.MANAGEMENT,
    source: 'Facebook Jobs',
    link: '#',
    aiAnalysis: {
      fraudScore: 95,
      matchScore: 0,
      reasoning: 'Highly suspicious: Requests upfront payment ("administration fee") and uses personal contact methods for a high-salary role.',
      isAnalyzed: true // Pre-analyzed for demo
    }
  },
  {
    id: '4',
    title: 'Inventory Controller',
    company: 'Coega SEZ (Logistics Zone)',
    location: 'Coega IDZ',
    postedDate: '2025-05-09',
    salary: 'Market Related',
    description: 'Manage stock levels, conduct cycle counts, and report discrepancies. Excel proficiency required.',
    category: JobCategory.INVENTORY,
    source: 'Direct Portal',
    link: '#',
    aiAnalysis: {
      fraudScore: 0,
      matchScore: 0,
      reasoning: '',
      isAnalyzed: false
    },
    status: JobStatus.APPLIED,
    appliedDate: '2025-05-10'
  },
  {
    id: '5',
    title: 'Logistics Coordinator',
    company: 'Isuzu Motors',
    location: 'Struandale',
    postedDate: '2025-05-08',
    salary: 'R22,000',
    description: 'Coordinate shipping manifests and transport schedules.',
    category: JobCategory.LOGISTICS,
    source: 'PNet',
    link: '#',
    aiAnalysis: {
      fraudScore: 0,
      matchScore: 0,
      reasoning: '',
      isAnalyzed: false
    },
    status: JobStatus.INTERVIEW,
    appliedDate: '2025-05-08'
  }
];
