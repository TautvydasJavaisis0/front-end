import {Marker, Popup} from "react-leaflet";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import L, {LatLngExpression} from "leaflet";

const myIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

interface Props{
  position:LatLngExpression
  setPosition:Dispatch<SetStateAction<LatLngExpression>>
}

const LocationMarker: React.FC<Props> = ({position, setPosition }) =>{

/*  useEffect(()=>{
    const map = useMapEvents({
      locationfound(e) {
        console.log("Found :) ", e)
        setPosition(e.latlng)
        //map.setView(e.latlng)
        //map.flyTo(e.latlng, map.getMaxZoom())
      },
      locationerror(e) {
        console.log("Not Found :( ", e)
      }
    })
    map.locate();


  },[])


   return position === null  ? null : (
     <Marker position={position} icon={myIcon}>
       <Popup>Tu esi čia</Popup>
     </Marker>
   )
*/

  useEffect(()=>{

    if (!navigator.geolocation) {
    } else {
      navigator.geolocation.getCurrentPosition((userPosition) => {
        setPosition([userPosition.coords.latitude, userPosition.coords.longitude]);

      }, () => {
        ///console.log(position)
      });
    }
  }, [setPosition])




  return position === null  ? null : (
    <Marker position={position} icon={myIcon}>
      <Popup>Tu esi čia</Popup>
    </Marker>
  )
}

export {LocationMarker};
