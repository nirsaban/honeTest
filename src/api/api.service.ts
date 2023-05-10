import { CompanyEntity } from '../common/entities/company.entity';
import { PerformenceCountryEntity } from '../common/entities/performenceCountries.entitiy';
import { AxiosHelper } from '../helpers/axios.helper';
import { AxiosInstance, AxiosResponse } from './../../node_modules/axios/index.d';

export class ApiService {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = new AxiosHelper().getClient();
  }

  public async getCompanies(): Promise<CompanyEntity[]> {
    try {
      const response: AxiosResponse<CompanyEntity[]> = await this.httpClient.get('/companies');

      return response.data as CompanyEntity[];
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getCompanyPerformence(companyId: number): Promise<PerformenceCountryEntity[]> {
    try {
      const response: AxiosResponse<PerformenceCountryEntity[]> = await this.httpClient.get(`/performance/countries/company/${companyId}`);

      return response.data as PerformenceCountryEntity[];
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getCountriesPerfomance(): Promise<PerformenceCountryEntity[]> {
    try {
      const response: AxiosResponse<PerformenceCountryEntity[]> = await this.httpClient.get(`/performance/countries`);

      return response.data as PerformenceCountryEntity[];
    } catch (error) {
      throw new Error(error);
    }
  }
}
