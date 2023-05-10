import { PerformenceCountryEntity } from './performenceCountries.entitiy';

export class CompanyEntity {
  display_name: string;
  id: number;
  name: string;
  performance?: PerformenceCountryEntity[];
}
