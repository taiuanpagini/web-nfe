import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '~/views/pages/authentication/login/Login';
import Dashboard from '~/views/pages/dashboard/analytics/ActivityTimeline';
import ListUsuarios from '~/views/pages/usuarios/List';
import CreateUsuario from '~/views/pages/usuarios/Create';
import ViewUsuario from '~/views/pages/usuarios/View';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/usuarios" component={ListUsuarios} isPrivate />
      <Route path="/usuario" component={CreateUsuario} isPrivate />
      <Route path="/usuario/id" component={ViewUsuario} isPrivate />
    </Switch>
  );
}
