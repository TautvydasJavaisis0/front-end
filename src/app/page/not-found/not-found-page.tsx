import React from 'react';
import { Button, Layout } from 'antd';

import { ReactComponent as Logo404 } from 'app/resources/icons/404.svg';
import { PageContent } from 'app/components/layout';
import styles from 'app/page/not-found/not-found-page-style.module.scss';
import { navigationService } from 'app/service/navigation-service';

const { Content } = Layout;

const NotFoundPage: React.FC = () => (
  <Layout>
    <Content>
      <PageContent>
        <div className={styles.emptyContainer}>
          <Logo404 />
          <h1>Deja, toks puslapis neegzistuoja</h1>
          <Button
            className={styles.createInitiativeButton}
            type={'default'}
            htmlType={'button'}
            onClick={() => navigationService.redirectToDefaultPage()}
          >
            Grįžti į pagrindinį puslapį
          </Button>

        </div>
      </PageContent>
    </Content>
  </Layout>
);

export { NotFoundPage };
