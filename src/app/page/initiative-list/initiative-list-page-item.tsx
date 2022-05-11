import React from 'react';
import {Progress} from 'antd';
import styles from "./initiative-list-page-style.module.scss"
import {ReactComponent as Next} from "../../resources/icons/next.svg"
import {ReactComponent as Close} from "../../resources/icons/x.svg"
import {navigationService} from "app/service/navigation-service";

interface Props{
  initiativeItem:Api.InitiativeDto;
  numberOfPeopleNeeded:number | 1;
  numberOfPeople:number | 0;
  showElement:boolean;
  closeAll?: () => void;
}


const InitiativeListPageItem: React.FC<Props> = ({ initiativeItem,numberOfPeople,numberOfPeopleNeeded,showElement ,closeAll}) =>{

  const handleContinue = () => {
    navigationService.redirectToInitiativeDetailsPage(initiativeItem.id);
  }

return (
  <div className={styles.listInitiative}>
      {/*    <div className={styles.featureList}>
      { initiativeItem.features?.map( (feature:string) => (

          <div key={feature} className={styles.feature}>
            Komunikacija
            {feature}
          </div>
        )
      )}

    </div>*/}
    <div className={styles.top}>
    { !showElement && (
        <div className={styles.close}>
          <Close onClick={closeAll}/>
        </div>

      )
    }
    </div>
    <div className={styles.allContext}  onClick={handleContinue}>
      <div className={styles.textBox}>

        <div className={styles.mainText}>
          <div className={styles.title}>
            {initiativeItem.title}
          </div>
          <div className={styles.participants}>
            Dalyviai
          </div>
        </div>
        <div className={styles.additionalInfo}>
          <div className={styles.description}>
            {/*Jau šį penktadienį ir šeštadienį parduotuvėse vyks trisdešimtoji Maisto banko akcija kurios metu bus
                        renkamas maistas*/}
            {initiativeItem.description}
          </div>
          <div className={styles.participantsFiller}>
            <Progress
              type="circle"
              width={65}
              strokeColor={{
                '0%': '#EC8A2F',
                '100%': '#ED5959',
              }}
              percent={ numberOfPeople / numberOfPeopleNeeded * 100}
              format={(percent) => `${numberOfPeople}/${numberOfPeopleNeeded}`}
            />

          </div>
        </div>
      </div>
    </div>

    { showElement && (
        <div className={styles.additionalDetails} onClick={handleContinue}>
          <Next/>
        </div>
      )
      }

    </div>
  )
}

export {InitiativeListPageItem};
