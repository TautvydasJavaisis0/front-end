import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'antd';

import { ReactComponent as Rain } from 'app/resources/icons/rain.svg';
import styles from 'app/page/initiative-details/modals/cancel-participation-modal-style.module.scss';
import {navigationService} from "app/service/navigation-service";

interface Props {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

class GoToProfilePageModal extends React.Component<Props> {

  private readonly handleSkip  = () => {
    this.props.setModalVisible(false);
  };

  private readonly handleYes  = () => {
    navigationService.redirectToUserProfilePage();
  };

  public render(): React.ReactNode {
    return (
      <Modal
        centered={true}
        footer={null}
        width={340}
        visible={this.props.modalVisible}
        closable={false}
        /*       onCancel={() => this.props.setModalVisible(false)}*/
      >
        <div className={styles.modalContent}>
          <div className={styles.mainContent}>
            <Rain />
            <div className={styles.modalLabel}>Norint peržiurėti profilį turite
              prisijungti
            </div>
          </div>
          <div className={styles.buttons}>
            <div className={styles.skip} onClick={this.handleSkip}>Išeiti</div>
            <div className={styles.yes} onClick={this.handleYes}>Prisijungti</div>
          </div>
        </div>
      </Modal>
    );

  }

}

export { GoToProfilePageModal };
