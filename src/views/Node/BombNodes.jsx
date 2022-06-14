import { Grid } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import BombNode from '../BombNode';
import BombCard from './BombCard';
import LPCard from './LPCard';



const BombNodes = () => {
  const { path } = useRouteMatch();
  return (
    <Page>
      <Switch>
        <Route exact path={path}>
          <h1 style={{ fontSize: '80px', textAlign: 'center' }}>NODES</h1>
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            <BombCard />
            <LPCard />
          </Grid>
        </Route>
        <Route path={`${path}/:bankId`}>
          <BombNode />
        </Route>
      </Switch>
    </Page>
  );
};

export default BombNodes;
