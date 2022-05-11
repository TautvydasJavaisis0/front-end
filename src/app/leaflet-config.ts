import L from 'leaflet';
// tslint:disable-next-line:no-submodule-imports
import 'leaflet/dist/leaflet.css';
// tslint:disable-next-line:no-submodule-imports
import icon from 'leaflet/dist/images/marker-icon.png';
// tslint:disable-next-line:no-submodule-imports
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
