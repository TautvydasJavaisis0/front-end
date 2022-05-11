import React from 'react';
import { Layout } from 'antd';

import { PageContent } from 'app/components/layout';
import { navigationService } from 'app/service/navigation-service';
import styles from 'app/page/competence-select/competence-select-page.module.scss';
import { ArrowButton } from 'app/components/buttons/arrow-button/arrow-button';

const { Content } = Layout;

interface Props {
  features: string[];
  onToggleHex: (id: string) => void;
}

class CompetenceSelectPage extends React.Component<Props> {


  public renderButton = (feature: string) =>
  (
    <div
      className={this.props.features.some(_feature => _feature === feature) ? styles.hexOn : styles.hex}
      onClick={() => this.props.onToggleHex(feature)}
    >
      <div className={styles.hexTextas}>
        {feature.replace(/^\w/, (c) => c.toUpperCase())}
      </div>
    </div>
  );

  public render(): React.ReactNode {
    return (
      <Layout>
        <Content>
          <PageContent className={styles.pageContentBody}>
            <div className={styles.container}>
              <h1 className={styles.title}>Ką norėtumėte išmokti?</h1>
              <div className={styles.hexGrid}>
                <div className={styles.hexGridA} >
                  <div className={styles.hexTransparent} />
                {this.renderButton('pilietiškumas')}
                </div>
                <div className={styles.hexGridB}>
                  {this.renderButton('lyderystė')}
                  <div className={styles.hexTransparent} />
                </div>
                <div className={styles.hexGridA}>
                  {this.renderButton('komunikacija')}
                  {this.renderButton('tolerancija')}
                </div>
                <div className={styles.hexGridB}>
                  {this.renderButton('solidarumas')}
                </div>
                <div className={styles.hexGridA}>
                  {this.renderButton('kūrybiškumas')}
                </div>
              </div>
              {
                (this.props.features.length === 0) && (
                  <div
                    className={styles.buttonSkip}
                    onClick={this.handleArrowClickNext}
                  >praleisti
                  </div>
                )
              }

              {
                (this.props.features.length !== 0) && (
                  <ArrowButton
                    pointingLeft={false}
                    onClick={this.handleArrowClickNext}
                  />
                )
              }
              <ArrowButton
                pointingLeft={true}
                onClick={this.handleArrowClickBack}
              />
          </div>
          </PageContent>
        </Content>
      </Layout>

    );
  }
  private readonly handleArrowClickBack = (): void => {
    navigationService.redirectToDefaultPage();
  };

  private readonly handleArrowClickNext = (): void => {
    navigationService.redirectToInitiativeMapPage();
  };
}

export { CompetenceSelectPage };
