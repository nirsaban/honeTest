import React, { useEffect, useState } from 'react';
import './App.css';
import { BaseLayout } from './layouts';
import { Chart } from './components/charts';
import { CDBPageItem } from 'cdbreact';
import { Container, Row } from 'react-bootstrap';
import { TableComponent } from './components/table';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { ApiService } from './api/api.service';
import { CompanyEntity } from './common/entities/company.entity';
import { Loader } from './components/loader';
import { PerformanceCompanyOrder, PerformenceCountryEntity } from './common/entities/performenceCountries.entitiy';
import { useDispatch } from 'react-redux';
import { setCompaniesPerformance } from './redux/companyPerformance';

export const App = () => {
  const [isSet, setIsSet] = useState<boolean>(false);
  const loaderState: boolean = useSelector((state: RootState) => state?.loader?.loader);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const apiInstance: ApiService = new ApiService();

      const companies: CompanyEntity[] = await apiInstance.getCompanies();

      const companiesPerformance: PerformenceCountryEntity[][] = await Promise.all(companies.map((company) => apiInstance.getCompanyPerformence(company.id)));

      const countryPerformance: PerformenceCountryEntity[] = await apiInstance.getCountriesPerfomance();

      const dataOrderd: PerformanceCompanyOrder[] = orderData(companies, companiesPerformance, countryPerformance);

      dispatch(setCompaniesPerformance(dataOrderd));

      setIsSet(!isSet);
    };

    if (!isSet) {
      const id = setInterval(() => fetchData(), 1000);
      return () => clearInterval(id);
    }
  }, [isSet]);

  // This function takes three arrays and returns an array of objects containing the data from the three inputs
  const orderData = (
    companies: CompanyEntity[],
    companiesPerformance: PerformenceCountryEntity[][],
    countries: PerformenceCountryEntity[]
  ): PerformanceCompanyOrder[] => {
    const result: PerformanceCompanyOrder[] = companies
      .map((company, i) => {
        // Map each country performance of a given company to its industry performance
        return companiesPerformance[i].map((countryPerformance) => {
          // Find the industry performance corresponding to a country performance
          const industryPerformance = countries.find((country) => country.iso === countryPerformance.iso);
          // Return an object containing the data from the three inputs
          return {
            ...company,
            ...countryPerformance,
            industry: Math.floor((industryPerformance.revenue / industryPerformance.cost) * 1000) / 1000,
            ROI: Math.floor((countryPerformance.revenue / countryPerformance.cost) * 1000) / 1000
          };
        });
        // Flatten the array of arrays into a single array of objects
      })
      .flat()
      .sort((a, b) => b.ROI - a.ROI);

    return result;
  };
  return (
    <BaseLayout>
      <Container className="p-3">
        <Row>
          <Chart />
        </Row>
        <Row>
          <TableComponent />
        </Row>
      </Container>
      {loaderState ? <Loader /> : ''}
    </BaseLayout>
  );
};

export default App;
