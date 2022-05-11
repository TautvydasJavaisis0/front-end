import React, { useEffect, useState } from 'react';
import { Layout, message, Modal, Progress } from 'antd';
import { useParams } from 'react-router';
import { PageContent } from 'app/components/layout';
import { navigationService } from 'app/service/navigation-service';
import styles from 'app/page/initiative-details/initiative-details-page-style.module.scss';
import { initiativeService } from 'app/api/service/initiative-service';
import { applicationService } from 'app/api/service/application-service';
import { connectContext, SettingsProps } from 'app/context';
import { AskQuestionWindow, CommentsContainer } from 'app/components/comments';
import { CancelParticipationModal } from 'app/page/initiative-details/modals/cancel-participation-modal'
const { Content } = Layout;

interface PropsId {
  id: string;
}

interface ContextProps {
  userEmail: string | undefined;
  authenticated: boolean;
  updateLastLocation: (page: string) => void;
}

const handleArrowClick = () => {
  navigationService.goBack();
};

const InitiativeDetails: React.FC<ContextProps> = ({ userEmail, authenticated , updateLastLocation }) => {
  const { id } = useParams<PropsId>();
  const lastPath = window.location.pathname;

  const [initiatives, setInitiatives] = useState<Api.InitiativeDto>();

  const [isInitiativeOwner, setIsOwner] = useState(false);
  const [hasOrganisation, setHasOrganisation] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const [isAskQuestionWindowActive, setAskQuestionWindowActive] = useState(false);
  const [isCancelModalVisable, setCancelModalVisable] = useState(false);

  useEffect(() => {

    if (lastPath) {
      updateLastLocation(lastPath);
    }

    initiativeService.getInitiativeById(id)
      .then((response) => {
        setInitiatives(response);
        setIsOwner(userEmail === response.user?.email);
        setHasOrganisation(response.organisation !== null);
        // console.log(`username ${username}`);
        // console.log(`author: ${response.user?.email}`);
        // console.log(response);
      });

    applicationService.checkIsApplicantApplied(id)
      .then((response) => {
        setIsApplied(response);
      })
      .catch(() => setIsApplied(false));

  }, [id, userEmail, lastPath, updateLastLocation]);

  const totalVol = initiatives?.totalNumberOfVolunteers ?? 1;
  const currentVol = initiatives?.currentNumberOfVolunteers ?? 0;

  const renderButton = (btnText: string, style: string) =>
    (
      <div className={style}>
        <div className={styles.buttonText}>
          {btnText}
        </div>
      </div>
    );

  const renderOwnerControlModal = () =>
    (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <h2>{initiatives?.title}</h2>
          <button onClick={showModal} className={styles.moreModal} />
        <Modal
          style={{ left: 25, top: 25, marginRight: 60 }}
          footer={null}
          width={142}
          closable={false}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
         <div onClick={handleClickEdit}>Koreguoti</div>
         <div onClick={handleClickRemove}>Pašalinti</div>
        </Modal>
      </div>
    );

  const handleClickEdit = () => {
    navigationService.redirectToCreateInitiativePage();
  };

  const handleClickRemove = () => {
    initiativeService.removeInitiative(id)
      .then(() => navigationService.redirectToInitiativeListPage(null))
      .catch(() => {
        message.error('Nepavyko ištrinti iniciatyvos')
          .then(() => window.location.reload());
      });

  };

  const deleteUser = () => {
    removeUser(id);
  }

  const applyUser = (initiativeId: string) => {
    applicationService.putApplicant(initiativeId)
      .then(() => window.location.reload())
      .catch(() => {
        message.error('Įvyko klaida')
          .then(() => window.location.reload());
      });
  };

  const removeUser = (initiativeId: string) => {
    applicationService.removeApplicant(initiativeId)
      .then(() => window.location.reload())
      .catch(() => {
        message.error('Įvyko klaida')
          .then(() => window.location.reload());
      });
  };

  const toggleAskQuestion = () => setAskQuestionWindowActive(!isAskQuestionWindowActive);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClickUserList = () => {
    navigationService.redirectToUserListPage(id);
  };

  return(
    <Layout>
      <Content>
        <PageContent className={isAskQuestionWindowActive ? '' : styles.pageContentInitiative}>
          { !isAskQuestionWindowActive && (
            <>
              {/*=============================================pirmas blokas==========================================*/}
              <section className={styles.topSection}>
                <button
                  className={styles.arrowButtonBack}
                  onClick={handleArrowClick}
                />
                {isInitiativeOwner && (renderOwnerControlModal())}
                {!isInitiativeOwner && (<h2>{initiatives?.title}</h2>)}
              </section>
              <section className={styles.topSection}>
                <div className={styles.organiserIcon} />
                <div className={styles.tekstasOrganizatorius}>
                  Organizatorius:
                </div>
                  &nbsp;
                  {!hasOrganisation && (<div className={styles.tekstasAsmuo}>{initiatives?.user?.fullName}</div>)}
                  {hasOrganisation && (<div className={styles.tekstasAsmuo} >{initiatives?.organisation}</div>)}
              </section>
              <section className={styles.topSection}>
                <div className={styles.description}>
                  {initiatives?.description}
                </div>
              </section>
              <div className={styles.lineSeparator} />
              {/*=============================================antras blokas==========================================*/}
              <section>
                <div className={styles.infoTitle}>
                  Vieta
                </div>
                <div className={styles.locationBox}>
                  <section className={styles.locationSection}>
                    <div className={styles.tekstasAdresas}>
                      {initiatives?.address}
                    </div>
                    <div className={styles.mapPin} />
                  </section>
                </div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div className={styles.infoTitle}>
                    Dalyviai
                  </div>
                  {
                    isInitiativeOwner && (
                      <div onClick={handleClickUserList} style={{ fontStyle: 'italic', fontSize: 12, color: '#FB984C' }}>
                        Žiūrėti daugiau
                      </div>
                    )
                  }

                </div>
                <div>
                  <Progress
                    type="line"
                    width={100}
                    strokeColor={{
                      '0%': '#EC8A2F',
                      '100%': '#ED5959',
                    }}
                    strokeLinecap={'square'}
                    percent={currentVol / totalVol * 100}
                    format={(percent) => `${currentVol}/${totalVol}`}
                  />

                </div>
                <div className={styles.infoTitle}>
                  Data ir laikas
                </div>
                <section className={styles.basicSection}>
                  <div className={styles.contentTitle}>
                    Pradžia
                  </div>
                  <div className={styles.tekstas}>
                    &nbsp; {initiatives?.startDate}
                  </div>
                </section>
                <section className={styles.basicSection}>
                  <div className={styles.contentTitle}>
                    Pabaiga
                  </div>
                  <div className={styles.tekstas}>
                    &nbsp; {initiatives?.endDate}
                  </div>
                </section>
                <div className={styles.infoTitle}>
                  Įgysite tokias kompetencijas
                </div>
                <div className={styles.featureList}>
                  { initiatives?.features?.map((feature: string) => (
                      <div key={feature} className={styles.feature}>
                        {feature}
                      </div>
                    ),
                  )}
                </div>

                <div className={styles.infoTitle}>
                  Kontaktai
                </div>
                <section className={styles.basicSection}>
                  <div className={styles.tekstas}>
                    {initiatives?.user?.email}
                  </div>
                </section>
                <section className={styles.basicSection}>
                  <div className={styles.tekstas}>
                    {initiatives?.user?.phoneNo}
                  </div>
                </section>
                <div className={styles.lineSeparator} />
              </section>
              {/*============================================trečias blokas==========================================*/}
              { initiatives?.id !== undefined && (
                <CommentsContainer
                  initiativeId={initiatives.id}
                  toggleAskQuestionWindow={toggleAskQuestion}
                  login={navigationService.redirectToLoginPage}
                  isOwner={isInitiativeOwner}
                  isLoggedIn={authenticated}
                />
                )
              }
              {/*user button apply -> login*/}
              {
                !isInitiativeOwner && !authenticated && (
                  <div
                    style={{ position: 'sticky', bottom: 0, marginBottom: '-20px' }}
                    onClick={() => navigationService.redirectToLoginPage()}
                  >
                    {renderButton('Savanoriauti', styles.buttonApply)}
                  </div>
                )
              }
              {/*authenticated user button apply */}
              {
                !isInitiativeOwner && authenticated && !isApplied && (
                  <div
                    style={{ position: 'sticky', bottom: 0, marginBottom: '-20px' }}
                    onClick={() => applyUser(id) }
                  >
                    {renderButton('Savanoriauti', styles.buttonApply)}
                  </div>
                )
              }

              {/*user button resign*/}
              {
                !isInitiativeOwner && authenticated && isApplied && (
                  <div
                    style={{ position: 'sticky', bottom: 0, marginBottom: '-20px' }}
                    /*onClick={() => removeUser(id)}*/
                    onClick={() => setCancelModalVisable(!isCancelModalVisable)}
                  >
                    {
                      isCancelModalVisable && (
                        <CancelParticipationModal modalVisible={isCancelModalVisable} setModalVisible={setCancelModalVisable} deleteUser={deleteUser}/>
                      )
                    }
                    {renderButton('Nebesavanoriauti', styles.buttonResign)}
                  </div>
                )
              }
            </>
          )}
          { isAskQuestionWindowActive && (
            <AskQuestionWindow
              initiativeID={initiatives?.id ?? 1}
              initiativeTitle={initiatives?.title}
              toggleAskQuestionWindow={toggleAskQuestion}
            />
          )}
        </PageContent>
      </Content>
    </Layout>
  );
};

const mapContextToProps = (
  {
    session: { user, authenticated },
    actions: { updateLastLocation } }: SettingsProps): ContextProps => ({
      userEmail: user?.email,
      authenticated,
      updateLastLocation,
    });

const InitiativeDetailsPage = connectContext(mapContextToProps)(InitiativeDetails);

export { InitiativeDetailsPage };
