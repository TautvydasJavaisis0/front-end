import React, { Dispatch, SetStateAction } from 'react';
import { Marker } from 'react-leaflet';
import styles from './initiative-map-page.module.scss';
import { InitiativeListPageItem } from '../initiative-list/initiative-list-page-item';
import L from 'leaflet';

const initiativeIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Props {
  initiativeItem: Api.InitiativeDto;
  markerListStates: { id: number | undefined; show: boolean; }[];
  setMarkerListStates: Dispatch<SetStateAction<{ id: number | undefined; show: boolean; }[]>>;
  reloadPage: () => void;
}

let lat: number = 0;
let lng: number = 0;
let totalNumOfPeople: number = 1;
let currentNumOfPeople: number = 1;

const InitiativeMapPageMarker: React.FC<Props> = ({
                                                    initiativeItem,
                                                    markerListStates,
                                                    setMarkerListStates,
                                                    reloadPage,
                                                  }) => {
  const showElement = false;
  if (initiativeItem.latitude !== undefined && initiativeItem.longitude !== undefined) {
    lat = initiativeItem?.latitude;
    lng = initiativeItem?.longitude;
  }
  if (initiativeItem.totalNumberOfVolunteers !== undefined && initiativeItem.currentNumberOfVolunteers !== undefined) {
    totalNumOfPeople = initiativeItem?.totalNumberOfVolunteers;
    currentNumOfPeople = initiativeItem?.currentNumberOfVolunteers;
  }

  const closeAll = () => {
    markerListStates.map((r) => r.show = false);
    setMarkerListStates(markerListStates);
    reloadPage();
  };

  return (
    <div className={styles.initiativeMarker}>
      <Marker position={[lat, lng]} icon={initiativeIcon} eventHandlers={{
        click: (e) => {
          setMarkerListStates(
            markerListStates.map((r) => r.id === initiativeItem.id
              ? { ...r, show: !r.show }
              : { ...r, show: false },
            ),
          );
        },
      }}>
        {markerListStates.find(r => r.id === initiativeItem.id)?.show && (
          <InitiativeListPageItem
            initiativeItem={initiativeItem}
            numberOfPeopleNeeded={totalNumOfPeople}
            numberOfPeople={currentNumOfPeople}
            showElement={showElement}
            closeAll={closeAll}
          />
        )
        }
      </Marker>
    </div>
  );
};

export { InitiativeMapPageMarker };
