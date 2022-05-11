import React from 'react';

import styles from './user-daily-info.module.scss';

interface OwnProps {
  daysVolunteered?: number;
  numberOfOrganisersApproved?: number;
  initiativesAttended?: number;
}

type Props = OwnProps;

const UserDailyInfo: React.FC<Props> = ({ daysVolunteered, numberOfOrganisersApproved, initiativesAttended }) =>

  (
    <div style={{ marginTop: '17px', marginBottom: '30px' }}>
      <div className={styles.item}>
        <span className={styles.text} >Savanoriauta</span>
        <span className={styles.center}>{daysVolunteered ?? ''}</span>
        <span className={styles.text} style={{ textAlign: 'right' }}>dienų</span>
      </div>
      <div className={styles.item}>
        <span className={styles.text} >Palankiai įvertino</span>
        <span className={styles.center}>{numberOfOrganisersApproved ?? ''}</span>
        <span className={styles.text} style={{ textAlign: 'right' }}>organizatoriai</span>
      </div>
      <div className={styles.item}>
        <span className={styles.text} >Dalyvauta</span>
        <span className={styles.center}>{initiativesAttended ?? ''}</span>
        <span className={styles.text} style={{ textAlign: 'right' }}>savanorystėse</span>
      </div>
    </div>
  );

export { UserDailyInfo };
