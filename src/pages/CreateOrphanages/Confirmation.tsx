import React from 'react';
import { Link } from 'react-router-dom';

import './confirmation.css';

export default function Confirmation() {
  return (
    <div id="page-confirmation">
      <div className="content-wraper">
        <main>
        <h1>Ebaaa!</h1>

        <p>O cadastro deu certo e foi enviado<br/>
          ao administrador para ser aprovado.<br/>
          Agora é só esperar :)
        </p>

        <Link to="/app" className="back-to-map-button">
          Voltar para o mapa
        </Link>
        </main>
      </div>
    </div>
  )
}