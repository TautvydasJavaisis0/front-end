import React from 'react';

import styles from 'app/components/loading-screens/loading-screen.module.scss';

const LoadingScreen: React.FC = () =>

  (
    <div className={styles.container}>
      <div className={styles.animate}>
      </div>
    </div>
  );

export { LoadingScreen };
