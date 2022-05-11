import React, { useEffect, useState } from 'react';
import { Button, Layout } from 'antd';

import { PageContent } from 'app/components/layout';
import { initiativeService } from 'app/api/service/initiative-service';
import { InitiativeListPageItem } from 'app/page/initiative-list/initiative-list-page-item';
import { FilterButton } from 'app/components/buttons/filter-button/filter-button';
import { history, navigationService, NavigationService } from 'app/service/navigation-service';
import { NavigationBar } from 'app/components/navbar/navigation-bar';

import EmptyIcon from 'app/resources/icons/girl-typing-on-laptop.svg';
import PlusIcon from 'app/resources/icons/plus-circle.svg';

import styles from './initiative-list-page-style.module.scss';

const { Content } = Layout;

interface Props {
  features: string[];
  endDate: string | undefined;
  startDate: string | undefined;
  location: string | undefined;
}

const InitiativeListPage: React.FC<Props> = ({ features, endDate, startDate, location }) => {
  const [initiatives, setInitiatives] = useState<Api.InitiativeDto[]>([]);
  const [emptyList, setEmptyList] = useState(false);
  const showElement = true;

  useEffect(() => {
    console.log(features, endDate, startDate, location);
    initiativeService.getInitiatives(features, endDate, startDate, location)
      .then((response) => {
        if (response.length === 0) {
          setEmptyList(true);
        } else {
          setInitiatives(response);
          setEmptyList(false);
        }
      });

  }, [features, endDate, startDate, location]);

  return(
    <Layout>
      <Content>
        <PageContent className={`${styles.pageContent} ${initiatives.length === 0 && styles.pageContentEmpty}`}>
          <div className={styles.topInfo}>
            <div className={styles.topName}>
              Iniciatyvos
            </div>
            <div
              className={styles.filterButton}
              onClick={() => history.push(NavigationService.FILTER_INITIATIVE_PATH)}
            >
              <FilterButton className={styles.filterButtonColor}/>
            </div>
          </div>

          <div className={styles.list}>
              { initiatives.length > 0 && (
                initiatives.map((initiativeItem, i) =>
                  <InitiativeListPageItem
                    key={i}
                    initiativeItem={initiativeItem}
                    numberOfPeopleNeeded={initiativeItem.totalNumberOfVolunteers ?? 1}
                    numberOfPeople={initiativeItem.currentNumberOfVolunteers ?? 0}
                    showElement={showElement}
                  />,
                )
              )}
            { emptyList && (
              <div className={styles.emptyContainer}>
                <img src={EmptyIcon} alt={''} />
                <p>
                  Pagal filtrus iniciatyvų neradome.<br />Prisidėkite prie visuomenės gerovės ir sukurkite iniciatyvą!
                </p>
                <Button
                  className={styles.createInitiativeButton}
                  type={'default'}
                  htmlType={'button'}
                  icon={<img src={PlusIcon} alt={''} />}
                  onClick={() => navigationService.redirectToCreateInitiativePage()}
                >
                  Kurti iniciatyvą
                </Button>
              </div>
            )}
          </div>
        </PageContent>
        <NavigationBar whichActive={'list'} />
      </Content>
    </Layout>
  );
};

export { InitiativeListPage };
