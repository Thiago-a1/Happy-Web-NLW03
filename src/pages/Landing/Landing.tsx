import React from 'react';
import { Link } from 'react-router-dom';
import {FiArrowRight} from 'react-icons/fi';

import './landing.css';

import logoImg from '../../images/Logo.svg';

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy"/>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Rio de Janeiro</strong>
          <span>Rio de Janeiro</span>
        </div>

        <Link to="/user" className="altenticate-button">
          Acesso restrito
        </Link>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, .6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;