import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'antd';

import { ReactComponent as Rain } from 'app/resources/icons/rain.svg';
import styles from 'app/page/initiative-details/modals/cancel-participation-modal-style.module.scss';

interface Props {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  deleteUser: () => void;
}

class CancelParticipationModal extends React.Component<Props> {

  private readonly handleSkip  = () => {
    this.props.setModalVisible(false);
  };

  private readonly handleYes  = () => {
    this.props.deleteUser();
    this.props.setModalVisible(false);
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
            <div className={styles.modalLabel}>Ar tikrai norite atšaukti dalyvavimą
              šioje iniciatyvoje?
            </div>
          </div>
          <div className={styles.buttons}>
            <div className={styles.skip} onClick={this.handleSkip}>Išeiti</div>
            <div className={styles.yes} onClick={this.handleYes}>Taip</div>
          </div>
        </div>
      </Modal>
    );

  }

}

export { CancelParticipationModal };
