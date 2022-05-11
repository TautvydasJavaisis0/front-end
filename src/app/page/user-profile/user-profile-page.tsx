import React from 'react';
import { Button, Layout } from 'antd';

import { PageContent } from 'app/components/layout';
import { connectContext, SettingsProps } from 'app/context';
import profileIcon from 'app/resources/icons/user-icon.svg';
import bookmarkIcon from 'app/resources/icons/bookmark-icon.svg';
import initiativesIcon from 'app/resources/icons/my-initiatives-icon.svg';
import { navigationService } from 'app/service/navigation-service';
import { NavigationBar } from 'app/components/navbar/navigation-bar';

import styles from './user-profile.module.scss';

const { Content } = Layout;

interface ContextProps {
  fullName: string | undefined;
}

interface OwnProps {
}

type Props = OwnProps & ContextProps;

class UserProfile extends React.Component<Props> {
  public render(): React.ReactNode {
    const {
      fullName,
    } = this.props;

    return (
      <Layout>
         <Content>
           <PageContent className={styles.page}>
             <div>
               <h2 className={styles.title}>Profilis</h2>
               <Button className={styles.logoutButton} onClick={UserProfile.handleLogout} type={'text'}>
                 Atsijungti
               </Button>
             </div>
             <div className={styles.userDetailsContainer}>
                <div className={styles.userTextContainer}>
                  <img src={profileIcon} className={styles.userIcon} alt={'User Icon'} />
                  <span className={styles.userName}>
                    {fullName}
                  </span>
                </div>
                {/*<Button className={styles.createInitiativeButton}>*/}
                {/*  Kurti iniciatyvą*/}
                {/*</Button>*/}
              </div>
             <div className={styles.navigationsContainer}>
              <div className={styles.navigationBarContainer} onClick={UserProfile.handleUserVolunteeringHistory}>
                <img src={bookmarkIcon} alt={''} />
                <span>Savanoriavimo istorija</span>
              </div>
              <div className={styles.navigationBarContainer} onClick={UserProfile.handleMyCreatedInitiatives}>
                <img src={initiativesIcon} alt={''} />
                <span>Mano iniciatyvos</span>
              </div>
            </div>
         </PageContent>
           <NavigationBar whichActive={'profile'} />
       </Content>
      </Layout>
    );
  }

  private static readonly handleUserVolunteeringHistory = (): void => {
    navigationService.redirectToUsersVolunteeringHistory();
  };

  private static readonly handleMyCreatedInitiatives = (): void => {
    navigationService.redirectTOUsersCreatedInitiativesPage();
  };

  // private static readonly handleCancel = (): void => {
  //
  // };

  private static readonly handleLogout = (): void => {
    navigationService.redirectToLogoutPage();
    window.location.reload()
  };
}

const mapContextToProps = ({ session: { user } }: SettingsProps): ContextProps => ({
  fullName: user?.fullName,
});

const UserProfilePage = connectContext(mapContextToProps)(UserProfile);

export { UserProfilePage };
