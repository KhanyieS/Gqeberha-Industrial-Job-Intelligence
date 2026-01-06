import { Job, JobCategory, JobStatus } from './types';

export const USER_PROFILE_CV = `
KHANYISILE SIMBUKU
Gqeberha, South Africa 6205 | 072 0360 702 | khanyiesimbuku@hotmail.com

PROFESSIONAL SUMMARY
Dedicated warehouse operator with over 11 years of progressive experience in high-volume distribution environments. Expertise includes all facets of warehouse operations, such as picking, packing, checking, loading, stock counting, and supervisory assistance. Proven track record of maintaining accuracy and efficiency in fast-paced logistics operations while ensuring strict adherence to safety protocols.

SKILLS
• Warehouse Operations Management
• Inventory Control & Stock Management
• Equipment Operation (Forklift)
• Quality Assurance
• Team Coordination & Training
• Documentation & Reporting

WORK HISTORY
WAREHOUSE OPERATOR | 01/2016 to 12/2024
Imperial Cargo/ DP World, Gqeberha South Africa
• Executed comprehensive warehouse operations, including picking, packing, and checking of tobacco products.
• Performed accurate stock counting and inventory management, maintaining 99.5% accuracy rates.
• Operated loading equipment and coordinated shipment preparations.
• Assisted supervisors in daily operations, team coordination, and training.

WAREHOUSE OPERATOR | 12/2012 to 12/2016
DHL, Gqeberha South Africa
• Worked in a team on warehouse operations including picking, packing, and quality checking.
• Conducted stock counts and maintained inventory records.
• Operated loading equipment.

EDUCATION
KWAZAKHELE HIGH SCHOOL, Kwazakhele, Port Elizabeth
High School Diploma, 2008
`;

export const COMPANIES = [
  { name: 'VWSA', logo: 'VW' },
  { name: 'Ford', logo: 'F' },
  { name: 'Isuzu', logo: 'I' },
  { name: 'Aspen', logo: 'A' },
  { name: 'Coega', logo: 'C' },
];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Forklift Operator - Night Shift',
    company: 'VWSA (via Workforce)',
    location: 'Uitenhage, Gqeberha',
    postedDate: '2025-05-10',
    salary: 'R85/hr',
    description: 'Certified forklift operator needed for night shift in automotive warehouse. Must have valid license and clean safety record. Moving engine parts and pallets. Strict adherence to safety protocols required.',
    category: JobCategory.TECHNICAL,
    source: 'Workforce Agency',
    link: 'https://workforce.co.za/jobs',
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
    description: 'Assisting with packing pharmaceutical products. Strict hygiene standards. Matric required. No criminal record. Previous experience in high-volume distribution preferred.',
    category: JobCategory.INVENTORY,
    source: 'CareerJunction',
    link: 'https://aspenpharma.com/careers',
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
      isAnalyzed: true 
    }
  },
  {
    id: '4',
    title: 'Inventory Controller',
    company: 'Coega SEZ (Logistics Zone)',
    location: 'Coega IDZ',
    postedDate: '2025-05-09',
    salary: 'Market Related',
    description: 'Manage stock levels, conduct cycle counts, and report discrepancies. Excel proficiency required. Experience with SAP is a plus.',
    category: JobCategory.INVENTORY,
    source: 'Direct Portal',
    link: 'https://www.coega.co.za/careers',
    aiAnalysis: {
      fraudScore: 0,
      matchScore: 0,
      reasoning: '',
      isAnalyzed: false
    },
    status: JobStatus.APPLIED,
    appliedDate: '2025-05-10'
  }
];
