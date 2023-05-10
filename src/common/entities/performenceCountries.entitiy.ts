import { CompanyEntity } from './company.entity';

export interface PerformenceCountryEntity {
  installs: number;
  country: string;
  cost: number;
  iso: string;
  revenue: number;
  industry: number;
  ROI: number;
}

export type PerformanceCompanyOrder = PerformenceCountryEntity & CompanyEntity;
