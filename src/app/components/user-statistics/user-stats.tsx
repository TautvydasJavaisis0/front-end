import React, { useEffect, useState } from 'react';

import { UserFeaturesDto, userService } from 'app/api/service/user-service';
import { ReactComponent as Arrow } from 'app/resources/icons/balta-rodyklė.svg';
import { navigationService } from 'app/service/navigation-service';

import { RadarChart } from './chart/radar-chart';
import { UserDailyInfo } from './stats/user-daily-info';

import styles from './user-stats.module.scss';

interface OwnProps {
  userId?: number;
}

type Props = OwnProps;

const UserStats: React.FC<Props> = ({ userId }) => {
  const [userFeatureStats, setUserFeatureStats] = useState<UserFeaturesDto>();
  const [userStats, setUserStats] = useState<Api.UserStatsDto>();

  const handleArrowClick = () => navigationService.goBack();

  useEffect(() => {
    if (userId) {
      userService.getUserFeatureStats(userId)
        .then((response) => {
          console.log('user features', response, typeof response);
          setUserFeatureStats(response);
          // setUserFeatureStats({
          //   plietiskumas: 3,
          //   komunikacija: 2,
          //   kūrybiškumas: 0,
          //   lyderystė: 1,
          //   pilietiškumas: 5,
          //   solidarumas: 3,
          // })
        });

      userService.getUserStats(userId)
        .then((response) => {
          console.log('user stats response', response);
          setUserStats(response);
          // setUserStats({
          //   totalDays: 10,
          //   totalAttended: 10,
          //   rating: 8,
          // })
        });
    }

  }, [userId]);

  return (
    <div>
      <div className={styles.header}>
        <Arrow onClick={() => handleArrowClick()} />
        <h3>Savanoriavimo istorija</h3>
      </div>
      <RadarChart
        totalInitiativesAttended={userStats?.totalAttended !== 0 ? userStats?.totalAttended : 1}
        featureStats={userFeatureStats}
      />
      <UserDailyInfo
        daysVolunteered={userStats?.totalDays}
        numberOfOrganisersApproved={userStats?.rating}
        initiativesAttended={userStats?.totalAttended}
      />
    </div>
  );
};

export { UserStats };
