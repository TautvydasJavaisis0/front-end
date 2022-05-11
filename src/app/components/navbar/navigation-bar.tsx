import React, {useState} from 'react';
import { Button } from 'antd';

import { ReactComponent as Home } from 'app/resources/icons/home.svg';
import { ReactComponent as Map } from 'app/resources/icons/map.svg';
import { ReactComponent as User } from 'app/resources/icons/user.svg';
import { ReactComponent as List } from 'app/resources/icons/list.svg';
import { navigationService } from 'app/service/navigation-service';
import {connectContext, SettingsProps} from 'app/context';
import { GoToProfilePageModal } from 'app/components/navbar/modal/navigation-bar-modal'

import styles from './navigation-bar-style.module.scss';

interface ContextProps {
  authenticated: boolean;
}

interface OwnProps {
  whichActive: 'home' | 'map' | 'list' | 'profile';
}


type Props = OwnProps & ContextProps;

const NavigationBaras: React.FC<Props> = (props, State) => {
  const [modalVisible,setModalVisible] = useState(false);

  const {
    whichActive,
    authenticated,
    ...rest
  } = props;

  const handleHomeClick = () => {
    navigationService.redirectToDefaultPage();
  };
  const handleMapClick = () => {
    navigationService.redirectToInitiativeMapPage();
  };
  const handleListClick = () => {
    navigationService.redirectToInitiativeListPage(null);
  };
  const handleProfileClick = () => {
    if (authenticated) {
      navigationService.redirectToUserProfilePage();
    } else {
      setModalVisible(!modalVisible);
    }
  };

  return (
    <>
      {
        modalVisible && (
          <GoToProfilePageModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        )
      }
      <footer className={styles.navigationBar}>
        <Button
          type="default"
          htmlType="button"
          className={styles.button}
          onClick={handleHomeClick}
          icon={<Home className={whichActive === 'home' ? styles.icons : ''} />}
          {...rest}
        >
          Pagrindinis
        </Button>
        <Button
          type="default"
          htmlType="button"
          className={styles.button}
          onClick={handleMapClick}
          icon={<Map className={whichActive === 'map' ? styles.icons : ''} />}
          {...rest}
        >
          Žemėlapis
        </Button>
        <Button
          type="default"
          htmlType="button"
          className={styles.button}
          onClick={handleListClick}
          icon={<List className={whichActive === 'list' ? styles.icons : ''} />}
          {...rest}
        >
          Sąrašas
        </Button>
        <Button
          type="default"
          htmlType="button"
          className={styles.button}
          onClick={handleProfileClick}
          icon={<User className={whichActive === 'profile' ? styles.icons : ''} />}
          {...rest}
        >
          Anketa
        </Button>
      </footer>
    </>



  );
};

const mapContextToProps = ({ session: { authenticated } }: SettingsProps): ContextProps => ({
  authenticated,
});

const NavigationBar = connectContext(mapContextToProps)(NavigationBaras);

export { NavigationBar };
