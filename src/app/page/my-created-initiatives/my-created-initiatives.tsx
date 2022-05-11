import React from 'react';
import { Layout } from 'antd';
import { PageContent } from 'app/components/layout';
import styles from 'app/page/my-created-initiatives/my-created-initiatives-style.module.scss';
import { Content } from 'antd/es/layout/layout';
import { navigationService } from 'app/service/navigation-service';
import { ArrowButton } from 'app/components/buttons/arrow-button/arrow-button';
import {initiativeService} from "app/api/service/initiative-service";
import {InitiativeListPageItem} from "app/page/initiative-list/initiative-list-page-item";

interface Props {
}

interface State {
  activeInitiatives: Api.InitiativeDto[];
  oldInitiatives: Api.InitiativeDto[];
  showAll: boolean;
}

class MyCreatedInitiatives extends React.Component<Props, State> {

  public state: State = {
    activeInitiatives: [],
    oldInitiatives: [],
    showAll: false,
  };

  public componentDidMount() {
    initiativeService.getCreatedActiveInitiatives()
      .then((response) => {
        this.setState({ activeInitiatives: response });
      });

    initiativeService.getCreatedOldInitiatives()
      .then((response) =>{
        this.setState({oldInitiatives: response});
      });
  }

  public render(): React.ReactNode {
    return (
      <Layout>
        <Content>
          <PageContent className={styles.content}>
            <div className={styles.topInformation}>
              <ArrowButton className={styles.backButton} pointingLeft={true} onClick={() => navigationService.goBack()} />
              <div className={styles.pageTitle}>Mano iniciatyvos</div>
            </div>
            <div className={styles.activeInitiatives}>
              <div className={styles.label}>
                Aktyvios savanorystės
              </div>
              <div>
                { (this.state.showAll || (!this.state.showAll && this.state.activeInitiatives.length <= 2)) && (
                  this.state.activeInitiatives.map((initiativeItem) =>
                    <InitiativeListPageItem
                      key={initiativeItem.id}
                      initiativeItem={initiativeItem}
                      numberOfPeopleNeeded={initiativeItem.totalNumberOfVolunteers ?? 1}
                      numberOfPeople={initiativeItem.currentNumberOfVolunteers ?? 0}
                      showElement = {true}
                    />)
                  )
                }
                {
                  !this.state.showAll && this.state.activeInitiatives.length > 2 && (
                    <>
                      <InitiativeListPageItem
                        initiativeItem={this.state.activeInitiatives[0]}
                        numberOfPeopleNeeded={this.state.activeInitiatives[0].totalNumberOfVolunteers ?? 1}
                        numberOfPeople={this.state.activeInitiatives[0].currentNumberOfVolunteers ?? 0}
                        showElement = {true}
                      />
                      <InitiativeListPageItem
                        initiativeItem={this.state.activeInitiatives[1]}
                        numberOfPeopleNeeded={this.state.activeInitiatives[1].totalNumberOfVolunteers ?? 1}
                        numberOfPeople={this.state.activeInitiatives[1].currentNumberOfVolunteers ?? 0}
                        showElement = {true}
                      />
                    </>

                  )
                }
                {
                  this.state.showAll && this.state.activeInitiatives.length > 2 &&(
                    <div className={styles.showLess} onClick={() =>this.setState({showAll: false})}>
                      Rodyti mažiau
                    </div>
                  )
                }
                {
                  !this.state.showAll && this.state.activeInitiatives.length > 2 &&(
                    <div className={styles.showMore} onClick={() =>this.setState({showAll: true})}>
                      Rodyti visas iniciatyvas
                    </div>
                  )
                }
              </div>
            </div>
            <div className={styles.initiativesHistory}>
              <div className={styles.label}>
                Istorija
              </div>
              <div>
                {
                  this.state.oldInitiatives.map((initiativeItem, i) =>
                    <InitiativeListPageItem
                      key={i}
                      initiativeItem={initiativeItem}
                      numberOfPeopleNeeded={initiativeItem.totalNumberOfVolunteers ?? 1}
                      numberOfPeople={initiativeItem.currentNumberOfVolunteers ?? 0}
                      showElement = {true}
                    />)
                }
              </div>
            </div>

          </PageContent>
        </Content>
      </Layout>
    );
  }
}

export { MyCreatedInitiatives };
