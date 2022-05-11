import React from 'react';
import { Layout } from 'antd';

import { PageContent } from 'app/components/layout/page-content/page-content';

import styles from './page-loading-spinner.module.scss';

const { Content } = Layout;

const PageLoadingSpinner: React.FC = () => (
  <Layout>
    <Content>
      <PageContent className={styles.container}>
      </PageContent>
    </Content>
  </Layout>
);

export { PageLoadingSpinner };
