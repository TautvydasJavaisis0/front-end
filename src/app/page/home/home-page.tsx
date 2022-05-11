import React from 'react';
import { Layout } from 'antd';

import { connectContext, SettingsProps } from 'app/context';
import { navigationService } from 'app/service/navigation-service';
import { PageContent } from 'app/components/layout';
import { ReactComponent as Initiative } from '../../resources/icons/iniciatyva.svg';
import { ReactComponent as Volunteer } from '../../resources/icons/savanoriauti.svg';
import styles from './home-page.module.scss';
import { LoadingScreen } from 'app/components/loading-screens/loading-screen';

const { Content } = Layout;

interface ContextProps {
  username: string | undefined;
}

interface OwnProps {
}

type Props = OwnProps & ContextProps;

interface State {
  showMap: boolean;
}

class HomePageComponent extends React.Component<Props, State> {

  public readonly lastPath: string = window.location.pathname;
  public readonly isBaseHomePath: boolean = this.lastPath === '/';

  public readonly state: State = {
    showMap: false,
  };

  public render(): React.ReactNode {

    return (
      <Layout>
        {this.isBaseHomePath && (<LoadingScreen />)}
        <Content>
          <PageContent className={styles.pageContentBody}>
            <div className={styles.greeting}>
              Kokia veikla norite užsiimti?
            </div>
            <div className={styles.mainBox}>
              <div className={styles.contentBox}>
                <div onClick={this.handleClickCreateInitiative} >
                  <div>
                    <button className={styles.button}>
                      <Initiative />
                    </button>
                  </div>
                  <div className={styles.textBox}>
                    Kurti iniciatyvą
                  </div>
                </div>
                <div onClick={this.handleClickVolunteer}>
                  <div>
                    <button className={styles.button}>
                      <Volunteer />
                    </button>
                  </div>
                  <div className={styles.textBox}>
                    Savanoriauti
                  </div>
                </div>
              </div>
            </div>
          </PageContent>
        </Content>
      </Layout>
    );
  }

  private readonly handleClickVolunteer = (): void => { navigationService.redirectToCompetenceSelectPage(); };
  private readonly handleClickCreateInitiative = (): void => { navigationService.redirectToCreateInitiativePage(); };

}

const mapContextToProps = ({ session: { user } }: SettingsProps): ContextProps => ({
  username: user?.email,
});

const HomePage = connectContext(mapContextToProps)(HomePageComponent);

export { HomePage };
