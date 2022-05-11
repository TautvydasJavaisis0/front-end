import React from "react";
import { Modal } from "antd";
import { ReactComponent as Human} from "app/resources/icons/humanPC.svg";
import styles from 'app/page/user-list/initiative-participants-list-style.module.scss';

interface Props{
  modalVisible: boolean;
  setModalVisible: () => void;
  setApplicantsRate: (attended: boolean, rated: boolean) => void;
}

class InitiativeParticipantDeleteModal extends React.Component<Props>{

  private readonly handleExit  = () => {
    this.props.setModalVisible();
  };

  private readonly handleApprove  = () => {
    this.props.setModalVisible();
    this.props.setApplicantsRate(false,false);
  };

  public render(): React.ReactNode {
    return (
      <Modal
        centered
        footer={null}
        width={340}
        visible={this.props.modalVisible}
        onCancel={this.props.setModalVisible}
        closable={false}
      >
        <div className={styles.modalContent}>
          <div className={styles.mainContent}>
            <Human/>
            <div className={styles.modalLabel}>Ar tikrai šis savanoris
              nedalyvavo iniciatyvoje?
            </div>
          </div>
          <div className={styles.buttons}>
            <div className={styles.skip} onClick={this.handleExit}>Išeiti</div>
            <div className={styles.yes} onClick={this.handleApprove}>Nedalyvavo</div>
          </div>
        </div>
      </Modal>
    )

  }


}

export {InitiativeParticipantDeleteModal};
