import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import styles from './initiative-map-page.module.scss'
import {initiativeService} from 'app/api/service/initiative-service';
import {InitiativeMapPageMarker} from 'app/page/initiative-map/initiative-map-page-marker';
import {FilterButton} from "app/components/buttons/filter-button/filter-button";
import {history, NavigationService} from "app/service/navigation-service";
import {LocationMarker} from "app/page/initiative-map/initiative-map-page-location-marker";
import {LatLngExpression} from "leaflet";
import {NavigationBar} from "app/components/navbar/navigation-bar";

interface Props {
  features: string[];
  endDate: string | undefined;
  startDate: string | undefined;
  location: string | undefined;
}

const InitiativeMapPage: React.FC<Props> = ({features, endDate, startDate, location}) => {
  const [initiatives, setInitiatives] = useState<Api.InitiativeDto[]>([]);
  const [allInitiatives, setAllInitiatives] = useState<Api.InitiativeDto[]>([]);
  const [markerListStates, setMarkerListStates] = useState<{ id: number | undefined; show: boolean; }[]>([]);
  const [position, setPosition] = useState<LatLngExpression>([0, 0])

  useEffect(() => {
    initiativeService.getInitiatives(["pilietiškumas",
      "lyderystė",
      "komunikacija",
      "tolerancija",
      "solidarumas",
      "kūrybiškumas"])
      .then((response) => {
        setAllInitiatives(response);
        console.log(response);

        let markerList: { id: number | undefined; show: boolean; }[] = [];
        response.forEach((element) => {
          let newItem = {
            id: element.id,
            show: false
          };
          newItem.id = element.id;
          newItem.show = false;
          markerList.push(newItem)
        });
        setMarkerListStates(markerList);
      })
  }, [])

  function useForceUpdate() {
    const [, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

  const forceUpdate = useForceUpdate();

  useEffect(() => {

    initiativeService.getInitiatives(features, endDate, startDate, location)
      .then((response) => {
        setInitiatives(response);
      })

  }, [features, endDate, startDate, location]);

  return (
    <>
      <MapContainer className={styles.map} center={[55.329882, 23.905531]} zoom={6} scrollWheelZoom={true} tap={false}>
        <TileLayer
          /*     attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
               url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"*/
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div
          className={styles.filterButton}
          onClick={() => history.push(NavigationService.FILTER_INITIATIVE_PATH)}
        >
          <FilterButton/>
        </div>
        <div className={styles.markers}>
          {
            initiatives.map((initiativeItem, i) =>
              <InitiativeMapPageMarker
                key={i}
                initiativeItem={initiativeItem}
                markerListStates={markerListStates}
                setMarkerListStates={setMarkerListStates}
                reloadPage={forceUpdate}
              />
            )
          }
        </div>
        <LocationMarker
          position={position}
          setPosition={setPosition}
        />
      </MapContainer>
      <div className={styles.notification}>
        Buvo rasta {initiatives.length} iš {allInitiatives.length} galimų
        savanoriavimo vietų
      </div>
      <NavigationBar whichActive={'map'}/>
    </>
  )
}

export {InitiativeMapPage};
