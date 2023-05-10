import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { CategoryScale } from 'chart.js';
import ChartJs from 'chart.js/auto';
import { PerformanceCompanyOrder } from '../../common/entities/performenceCountries.entitiy';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Col, Container, Row } from 'react-bootstrap';

enum ActiveChart {
  installs = 'installs',
  ROI = 'ROI'
}

ChartJs.register(CategoryScale);
export const Chart = () => {
  const companiesPerformance: PerformanceCompanyOrder[] = useSelector((state: RootState) => state?.companiesPerformance.companiesPerformance);
  const [active, setActive] = useState<ActiveChart>(ActiveChart.installs);

  const getLablesX = (): string[] => {
    const topFiveX = companiesPerformance.slice(0, 5).map((item) => {
      return `${item.display_name} - ${item.country}`;
    });
    return topFiveX;
  };

  const getData = (): number[] => {
    const data = companiesPerformance.slice(0, 5).map((item) => {
      return item[active];
    });
    return data;
  };

  const [data, setData] = useState({
    labels: getLablesX(),
    datasets: [
      {
        label: 'Installs',
        lineTension: 0.1,
        backgroundColor: ['#0277BD', '#40C4FF', '#FFA726', '#F44336', '#AB47BC'],
        borderColor: 'rgb(194, 116, 161)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(71, 225, 167, 0.5)',
        pointHoverBorderColor: 'rgb(71, 225, 167)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: getData()
      }
    ]
  });

  useEffect(() => {
    setData({
      labels: getLablesX(),
      datasets: [
        {
          label: 'Installs',

          lineTension: 0.1,
          backgroundColor: ['#0277BD', '#40C4FF', '#FFA726', '#F44336', '#AB47BC'],
          borderColor: 'rgb(194, 116, 161)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(71, 225, 167, 0.5)',
          pointHoverBorderColor: 'rgb(71, 225, 167)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: getData()
        }
      ]
    });
  }, [companiesPerformance]);

  useEffect(() => {
    setData({
      labels: getLablesX(),
      datasets: [
        {
          label: 'Installs',

          lineTension: 0.1,
          backgroundColor: ['#0277BD', '#40C4FF', '#FFA726', '#F44336', '#AB47BC'],
          borderColor: 'rgb(194, 116, 161)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(71, 225, 167, 0.5)',
          pointHoverBorderColor: 'rgb(71, 225, 167)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: getData()
        }
      ]
    });
  }, [active]);

  const handleActiveChart = (active: ActiveChart): void => {
    setActive(active);
  };
  return (
    <CDBContainer>
      <Container>
        <Row>
          <Col
            onClick={() => handleActiveChart(ActiveChart.installs)}
            xs={1}
            className={active == ActiveChart.installs ? 'text-decoration-underline text-primary ' : ''}
          >
            Installs
          </Col>
          <Col xs={1} onClick={() => handleActiveChart(ActiveChart.ROI)} className={active == ActiveChart.ROI ? 'text-decoration-underline text-primary' : ''}>
            ROI
          </Col>
        </Row>
      </Container>
      <Bar data={data} options={{ responsive: true }} />
    </CDBContainer>
  );
};
