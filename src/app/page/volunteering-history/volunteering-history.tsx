import React from 'react';
import { Layout } from 'antd';

import { PageContent } from 'app/components/layout';
import styles from 'app/page/volunteering-history/volunteering-history-style.module.scss';
import { initiativeService } from 'app/api/service/initiative-service';
import { VolunteeringItem } from 'app/page/volunteering-history/single-volunteering/single-volunteering';
import { UserStats } from 'app/components/user-statistics';
import { connectContext, SettingsProps } from 'app/context';

const { Content } = Layout;

interface ContextProps {
  userId?: number;
}

interface State {
  activeInitiatives: Api.InitiativeDto[];
  oldInitiatives: Api.InitiativeDto[];
  showAll: boolean;
}

type Props = ContextProps;

class VolunteeringHistory extends React.Component<Props, State> {

  public state: State = {
    activeInitiatives: [],
    oldInitiatives: [],
    showAll: false,
  };

  public componentDidMount(): void {
    initiativeService.getAppliedActiveInitiatives()
      .then((response) => {
        this.setState({ activeInitiatives: response });
      });
    initiativeService.getAppliedOldInitiatives()
      .then((response) => {
        this.setState({ oldInitiatives: response });
      });
  }

  public render(): React.ReactNode {
    return (
      <Layout>
        <Content className={(this.state.activeInitiatives.length !== 0 || this.state.oldInitiatives.length !== 0) ? styles.content : ''}>
          <PageContent className={styles.pageContent}>
            <UserStats userId={this.props.userId} />
            <div className={styles.activeVolunteering}>
              { this.state.activeInitiatives.length !== 0 && (
                <div className={styles.volunteeringLabel}>Aktyvios savanorystės</div>
              )}
              { (this.state.showAll || (!this.state.showAll && this.state.activeInitiatives.length <= 2)) &&(
                  this.state.activeInitiatives.map((initiative) =>
                    <VolunteeringItem
                      key={initiative.id}
                      initiativeItem={initiative}
                    />,
              ))}
              { !this.state.showAll && this.state.activeInitiatives.length > 2 && (
                <>
                  <VolunteeringItem
                    initiativeItem={this.state.activeInitiatives[0]}
                  />
                  <VolunteeringItem
                    initiativeItem={this.state.activeInitiatives[1]}
                  />
                </>
              )}
              { !this.state.showAll && this.state.activeInitiatives.length > 2 && (
                <div className={styles.showAll} onClick={() => this.setState({ showAll: true })}>
                  Rodyti visas savanorystes
                </div>
              )}
              { this.state.showAll && this.state.activeInitiatives.length > 2 && (
                <div className={styles.showAll} onClick={() => this.setState({ showAll: false })}>
                  Rodyti mažiau
                </div>
              )}
            </div>
            <div className={styles.expiredVolunteering}>
              { this.state.oldInitiatives.length !== 0 && (
                <div className={styles.volunteeringLabel}>Pasibaigusios savanorystės</div>
              )}
              { this.state.oldInitiatives.map((initiative) =>
                <VolunteeringItem
                  key={initiative.id}
                  initiativeItem={initiative}
                />,
              )}
            </div>
          </PageContent>
        </Content>
      </Layout>
    );
  }
}

const mapContextToProps = ({ session: { user } }: SettingsProps): ContextProps => ({
  userId: user?.id,
});

const VolunteeringHistoryPage = connectContext(mapContextToProps)(VolunteeringHistory);

export { VolunteeringHistoryPage };
