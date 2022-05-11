import React from 'react';
import styles from "../volunteering-history-style.module.scss";
import { ReactComponent as Next } from 'app/resources/icons/next.svg';
import { navigationService } from 'app/service/navigation-service';

interface Props {
  initiativeItem: Api.InitiativeDto;
}

class VolunteeringItem extends React.Component<Props>{


  public handleContinue = () => {
    navigationService.redirectToInitiativeDetailsPage(this.props.initiativeItem.id);
  };

  public render(): React.ReactNode{
    return (
      <div className={styles.listInitiative}>
        <div className={styles.allContext}  onClick={this.handleContinue}>
          <div className={styles.textBox}>

            <div className={styles.mainText}>
              <div className={styles.title}>
                {this.props.initiativeItem.title}
                Pavadinimas ilgas
              </div>
            </div>
            <div className={styles.additionalInfo}>
              <div className={styles.description}>
                {this.props.initiativeItem.description}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.additionalDetails} onClick={this.handleContinue}>
          <Next />
        </div>
      </div>
    );
  };

}

export { VolunteeringItem };
