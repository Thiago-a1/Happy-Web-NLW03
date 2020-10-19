import React from 'react';
import { FiArrowLeft, FiAlertCircle, FiMapPin } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../../images/map-marker.svg';

import './sidebar.css';

type Props = {
  IsLogged?: boolean
}

export default function Sidebar({IsLogged}: Props) {
  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />

        {IsLogged && (
          <section className="dashboard-menu">
            <button type="button" onClick={() => {}}>
              <FiMapPin size={24} color="#FFF" />
            </button>
            <button type="button" onClick={() => {}}>
              <FiAlertCircle size={24} color="#FFF" />
            </button>
          </section>
        )}

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
  )
}