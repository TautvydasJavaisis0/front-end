import React from 'react';
import { Layout } from 'antd';


import { PageContent } from 'app/components/layout';
import { FilterInitiativeForm, FilterValue } from 'app/page/filter-initiative/filter-initiative-form';
import { navigationService } from 'app/service/navigation-service';

import styles from './filter-initiative-page.module.scss';

const { Content } = Layout;

interface Props {
  features: string[];
  endDate: string | undefined;
  startDate: string | undefined;
  location: string | undefined;
  setParentState: (state: any) => void;
}

class FilterInitiativePage extends React.Component<Props> {

  private readonly FILTERED_VALUES: FilterValue = {
    location: '',
    _datePlaceholder: '',
    startDate: '',
    endDate: '',
    features: this.props.features,
  };

  public render(): React.ReactNode {
    return (
      <Layout>
        <Content>
          <PageContent className={styles.content}>
            <div className={styles.container}>
              <div className={styles.top}>
                <section className={styles.topSection}>
                  <button
                    className={styles.arrowButtonBack}
                    onClick={this.handleArrowClick}
                  />
                  <h2>Iniciatyvų filtravimas</h2>
                </section>
                <div className={styles.resetButton} onClick={this.handleReset}>
                  Atstatyti
                </div>
              </div>
              <section>
                    <FilterInitiativeForm
                      features={this.props.features}
                      onSubmit={this.handleSubmit}
                      onReset={this.handleReset}
                      initialValues={this.FILTERED_VALUES}
                    />
              </section>
            </div>
          </PageContent>
        </Content>
      </Layout>
    );
  }

  private readonly handleReset = (): void => {
    window.location.reload();
  };

  private readonly handleArrowClick = (): void => {
    navigationService.goBack();
  };

  private readonly handleSubmit = (values: FilterValue): void => {

    if (!values.endDate && !values.startDate) {
      values.endDate = undefined;
      values.startDate = undefined;
    }
    if (!values.location) {
      values.location = undefined;
    }
    this.props.setParentState({
      features: values.features.map(feature => feature.toLowerCase()),
      endDate: values.endDate?.toISOString() ?? undefined,
      startDate: values.startDate?.toISOString() ?? undefined,
      location: values.location,
    });
    navigationService.goBack();
  };

}

export { FilterInitiativePage };
