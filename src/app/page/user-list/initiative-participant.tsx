import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { PageContent } from 'app/components/layout';
import styles from 'app/page/user-list/initiative-participants-list-style.module.scss';
import { ReactComponent as UserIcon } from 'app/resources/icons/user-icon.svg';
import { ReactComponent as Approve } from 'app/resources/icons/approve.svg';
import { ReactComponent as Delete } from 'app/resources/icons/delete.svg';
import { InitiativeParticipantModal } from 'app/page/user-list/modal/initiative-participant-modal';
import { applicationService } from 'app/api/service/application-service';
import { InitiativeParticipantDeleteModal } from 'app/page/user-list/modal/initiative-participant-detele-modal';
import { userService } from 'app/api/service/user-service';
import { initiativeService } from 'app/api/service/initiative-service';

interface Props {
  user: Api.UserDto;
  initiativeID?: number;
}

interface State {
  modalVisible: boolean;
  deleteModalVisible: boolean;
  attended: boolean | null;
  userStats: Api.UserStatsDto;
  userIsRated: boolean | null;
  initiativeHasEnded: boolean | null;
}

class InitiativeParticipant extends React.Component<Props, State> {

  public state: State = {
    modalVisible: false,
    deleteModalVisible: false,
    attended: null,
    userStats: {},
    userIsRated: null,
    initiativeHasEnded: null,
  };

  public componentDidMount() {
    userService.getUserStats(this.props.user.id ?? 0)
      .then((response) => {
        this.setState({ userStats: response });
      });
    applicationService.getAppicantIsRated(this.props.initiativeID ?? 0, this.props.user.id ?? 0)
      .then((response) => {
        this.setState({ userIsRated: response });
      });
    initiativeService.getEndedInitiative(this.props.initiativeID ?? 0)
      .then((response) => {
        this.setState({ initiativeHasEnded: response });
      });
  }

  private readonly setModalVisible  = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  private readonly setDeleteModalVisible = () => {
    this.setState({ deleteModalVisible: !this.state.deleteModalVisible });
  };

  private readonly setAplicantsRate = (attended: boolean, rated: boolean) => {
    applicationService.putApplicantRate(this.props.user.id ?? 0, this.props.initiativeID ?? 0, attended, rated)
      .then(() => {
        !this.state.initiativeHasEnded && (
          this.setState({userStats: {
              // @ts-ignore
            rating: this.state.userStats.rating + rated,
            totalApplied: this.state.userStats.totalApplied,
              // @ts-ignore
            totalAttended: this.state.userStats.totalAttended + attended,
            totalDays: this.state.userStats.totalDays,
          }})
        );
        this.state.initiativeHasEnded && (
          this.setState({userStats: {
              // @ts-ignore
            rating: this.state.userStats.rating + rated,
            totalApplied: this.state.userStats.totalApplied,
              // @ts-ignore
            totalAttended: this.state.userStats.totalAttended,
            totalDays: this.state.userStats.totalDays,
          }})
        );

        this.setState({ attended });
        this.setState({ userIsRated: true });
      });

  };

  public render(): React.ReactNode {
    return (this.state.attended || this.state.attended === null) && (
      <Layout>
        <Content>
          <PageContent className={styles.userContent}>
            <div className={styles.oneUser}>
              <div className={styles.user}>
                <div className={styles.userFullName}>
                  <UserIcon />
                  {this.props.user.fullName}
                </div>
                <div className={styles.userInfoDetails}>
                  <div className={styles.userInfo}>{this.props.user.email}</div>
                  <div className={styles.userInfo}>{this.props.user.phoneNo}</div>
                  <div className={styles.userInfoItalic}>{this.state.userStats.rating} teigiami įvertinimai</div>
                  <div className={styles.userInfoItalic}>Dalyvauta {this.state.userStats.totalAttended} iš {this.state.userStats.totalApplied} savanorysčių </div>
                </div>
              </div>
              <div className={styles.participation}>
                {
                  this.state.userIsRated === false && (
                  <>
                    <div className={styles.participationLabel}>
                      Ar šis savanoris dalyvavo iniciatyvoje?
                    </div>
                    <div className={styles.userButtons}>
                    <Approve onClick={this.setModalVisible} />
                  { this.state.modalVisible && (
                    <InitiativeParticipantModal modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} setApplicantsRate={this.setAplicantsRate} />
                    )}
                    <Delete onClick={this.setDeleteModalVisible} />
                  {
                    this.state.deleteModalVisible && (
                    <InitiativeParticipantDeleteModal modalVisible={this.state.deleteModalVisible} setModalVisible={this.setDeleteModalVisible} setApplicantsRate={this.setAplicantsRate} />
                    )
                  }
                    </div>

                  </>
                  )}

              </div>

            </div>
          </PageContent>
        </Content>
      </Layout>
   );
  }
}

export { InitiativeParticipant };
