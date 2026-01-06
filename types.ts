export enum JobCategory {
  GENERAL = 'General Worker',
  INVENTORY = 'Inventory/Stock',
  LOGISTICS = 'Logistics/Shipping',
  TECHNICAL = 'Technical/Operator',
  MANAGEMENT = 'Management'
}

export enum JobStatus {
  NEW = 'New',
  APPLIED = 'Applied',
  INTERVIEW = 'Interview',
  REJECTED = 'Rejected',
  OFFER = 'Offer'
}

export interface AIAnalysis {
  fraudScore: number; // 0-100 (100 is definitely fraud)
  matchScore: number; // 0-100
  reasoning: string;
  isAnalyzed: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  salary: string;
  description: string;
  category: JobCategory;
  source: string;
  link: string;
  aiAnalysis: AIAnalysis;
  status?: JobStatus;
  appliedDate?: string;
  generatedCoverLetter?: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  trend?: number; // percentage
  color: string;
}

export interface UserCV {
  rawText: string;
  formattedText?: string;
  lastUpdated: string;
}