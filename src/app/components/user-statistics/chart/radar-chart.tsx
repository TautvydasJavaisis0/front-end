import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart } from 'chart.js';

import { UserFeaturesDto } from 'app/api/service/user-service';

import styles from './radar-chart.module.scss';

Chart.defaults.scale.ticks.display = false;
// Chart.defaults.scale.max = 100;
Chart.defaults.font.family = 'Roboto';
Chart.defaults.font.weight = '600';
Chart.defaults.color = '#7c7c7c';
// console.log(Chart.defaults);

interface OwnProps {
  totalInitiativesAttended?: number;
  featureStats?: UserFeaturesDto;
}

type Props = OwnProps;

const RadarChart: React.FC<Props> = ({ totalInitiativesAttended, featureStats }) => {
  const [featureLabels, setFeatureLabels] = useState<string[][]>();
  const [dataset, setDataset] = useState<number[]>();

  useEffect(() => {
    if (featureStats && totalInitiativesAttended) {
      let labels: string[][] = [];
      let labelValues: number[] = [];
      Object.keys(featureStats).forEach((key) => {
        // Making [[initiative, initiative value], [...]] format
        const labelName = key.replace(/^\w/, (c) => c.toUpperCase());
        // First, capitalizing the first word, then converting to string the values in percentages
        const labelValue = featureStats[key] * 100 / totalInitiativesAttended;
        labels = [...labels, [labelName, labelValue + '%']];
        labelValues = [...labelValues, labelValue];
      });
      setFeatureLabels(labels);
      setDataset(labelValues);
    }
  }, [totalInitiativesAttended, featureStats]);

  return !featureStats ? null : (
    <Radar
      className={styles.radar}
      data={{
        // For multi line labels: https://stackoverflow.com/a/54411781
        // labels: featuresList.map((feature, i) => [feature, `${7 * i + 10}%`]),
        labels: featureLabels,
        datasets: [{
          data: dataset,
          backgroundColor: [
            'rgba(255, 193, 105, 0.55)',
          ],
          borderColor: '#fb984c',
          borderWidth: 1,
        }],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          // @ts-ignore
          min: 0,
          // max: 100,
          ticks: {
          },
        },
      }}
    />
  );
};

export { RadarChart };
