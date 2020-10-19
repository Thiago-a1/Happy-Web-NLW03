import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../../services/api';
import mapMarkerImg from '../../images/map-marker.svg';
import mapIcon from '../../utils/mapIcon';

import './orphanages-map.css';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number
};

function OrphanagesMap() {
  const { goBack } = useHistory();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Rio de janeiro</strong>
          <span>Rio de janeiro</span>
        </footer>
      </aside>

      <Map 
        center={[-22.9163403,-43.2299227]}
        zoom={12}
        style={{ width: '100%', height: '100%'}}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map(orphanage => {
          return (
            <Marker 
              icon={mapIcon}
              position={[orphanage.latitude,orphanage.longitude]}
              key={orphanage.id}
            >
              <Popup 
                closeButton={false} 
                minWidth={240} 
                maxWidth={240} 
                className="map-popup" >
                  {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight 
                    size={20} 
                    color="#000" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <button onClick={goBack} className="back-landing">
        <FiArrowLeft size={32} color="#FFF" />
      </button>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;