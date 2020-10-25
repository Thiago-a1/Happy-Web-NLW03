import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import OrphanagesMap  from './pages/OrphanagesMap/OrphanagesMap';
import Orphanage from './pages/Orphanage/Orphanage';
import Login from './pages/Login/Login';
import OrphanageDashboard from './pages/OrphanageDashboard/OrphanageDashboard';
import CreateOrphanage from './pages/CreateOrphanages/CreateOrphanage';
import Confirmation from './pages/CreateOrphanages/Confirmation';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact/>
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} exact/> 
        <Route path="/orphanages/:id" component={Orphanage} exact/> 

        <Route path="/user" component={Login} />
        <Route path="/orphanage/dashboard" component={OrphanageDashboard} />

        <Route path="/confirmation" component={Confirmation} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;