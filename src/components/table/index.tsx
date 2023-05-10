import Table from 'react-bootstrap/Table';
import { CompanyEntity } from '../../common/entities/company.entity';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { PerformanceCompanyOrder, PerformenceCountryEntity } from '../../common/entities/performenceCountries.entitiy';
import './index.css';
import { setCompaniesPerformance } from '../../redux/companyPerformance';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

const headers: { name: string; key: keyof PerformanceCompanyOrder }[] = [
  { name: 'Company', key: 'display_name' },
  { name: 'Country', key: 'country' },
  { name: 'Installs', key: 'installs' },
  { name: 'ROI', key: 'ROI' },
  { name: 'Industry ROI', key: 'industry' }
];

export const TableComponent = () => {
  const dispatch = useDispatch();
  const companiesPerformance: PerformanceCompanyOrder[] = useSelector((state: RootState) => state?.companiesPerformance.companiesPerformance);
  const [rows, setRows] = useState<PerformanceCompanyOrder[]>(companiesPerformance);
  const [rowsBackUp] = useState<PerformanceCompanyOrder[]>(companiesPerformance);
  const [sortAction, setSortAction] = useState({});

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.length === 0) {
      setRows(rowsBackUp);
    }

    if (value.length > 2) {
      const filter = rows.filter((row) => {
        if (typeof row[name] === 'number') {
          return row[name] === value;
        } else {
          return row[name].toLowerCase().includes(value.toLowerCase());
        }
      });
      setRows(filter);
    }
  };

  const handleSort = (key: keyof PerformanceCompanyOrder) => {
    setSortAction({
      ...sortAction,
      [key]: !sortAction[key]
    });

    const sorted = [...rows].sort((a, b) =>
      sortAction[key] ? (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0) : a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0
    );

    dispatch(setCompaniesPerformance([...sorted]));

    setRows(sorted);
  };

  useEffect(() => {
    console.log({ companiesPerformance });
  }, [companiesPerformance]);

  return (
    <Table bordered className="border-light text-center">
      <thead className="text-center">
        <tr>
          {headers.map((header, index) => {
            return (
              <th className={index < 2 ? 'bg-grey' : ''}>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', textAlign: 'center', alignItems: 'center' }}>
                  {header.name}
                  {sortAction[header.key] ? (
                    <BsArrowDown color="blue" onClick={() => handleSort(header.key)} />
                  ) : (
                    <BsArrowUp color="blue" onClick={() => handleSort(header.key)} />
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {headers.map((header, index) => {
            return (
              <td className={index < 2 ? 'bg-grey' : ''}>
                <input type="text" name={header.key} onChange={handleSearch} />
              </td>
            );
          })}
        </tr>
        {rows.map((row) => {
          return (
            <tr>
              <td className="bg-grey">{row.display_name}</td>
              <td className="bg-grey">{row.country}</td>
              <td>{row.installs}</td>
              <td>{row.ROI}</td>
              <td>{row.industry}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
