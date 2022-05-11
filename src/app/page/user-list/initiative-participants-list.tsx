import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { PageContent } from 'app/components/layout';
import styles from 'app/page/user-list/initiative-participants-list-style.module.scss';
import { ArrowButton } from 'app/components/buttons/arrow-button/arrow-button';
import { navigationService } from 'app/service/navigation-service';
import { userService } from 'app/api/service/user-service';

import { InitiativeParticipant } from  './initiative-participant';
import {initiativeService} from "app/api/service/initiative-service";
import {parseInt} from "lodash";


const convertPathToId = (path: string): string | null => {
  console.log('got path', path);
  const regexPath = path.match('(/users-list)/?(\\d+)?');
  if (!regexPath || !regexPath[2]) { return null; }
  return regexPath[2];
};

interface Props {
  id: number;
}

interface State {
  users: Api.UserDto[];
  initiative: Api.InitiativeDto;
}

class InitiativeParticipantsList extends React.Component<Props, State> {
  private readonly initiativeID: string | null = convertPathToId(window.location.pathname);

  public state: State = {
    users: [],
    initiative: {},
  };



  public componentDidMount() {
    if (this.initiativeID) {
      userService.getUsersByInitiative(parseInt(this.initiativeID))
        .then((response) => {
          this.setState({ users: response });
        });
      initiativeService.getInitiativeById(this.initiativeID)
        .then((response) =>{
          this.setState({initiative: response});
        });
    }
  }

  public render(): React.ReactNode {
    return (
      <Layout style={{background: "#F0F0F0"}}>
        <Content>
          <PageContent className={styles.content}>
            <div className={styles.topInformation}>
              <ArrowButton className={styles.backButton} pointingLeft={true} onClick={() => navigationService.goBack()} />
              <div className={styles.pageText}>
                <div className={styles.pageTitle}>Dalyviai</div>
                <div className={styles.initiativeTitle}>{this.state.initiative.title}</div>
              </div>
            </div>
            <div className={styles.description}>
              Siūlome ne tik peržiūrėti dalyvių sąrašą,
              bet ir įvertinti jų dalyvavimą jūsų vykdomoje iniciatyvoje.
              Taip pagerinsite  mūsų programėlės kokybę bei rasite tinkamus žmones iniciatyvai.
            </div>
            { this.state.initiative.id !== undefined && (
            <div className={styles.initiativeUserList}>
              {
                this.state.users.map((user) => (
                  <InitiativeParticipant
                    key={user.id}
                    user={user}
                    initiativeID={this.state.initiative.id}
                  />
              ))}
            </div>
            )}
          </PageContent>
        </Content>
      </Layout>
    );
  }

}

export { InitiativeParticipantsList };
