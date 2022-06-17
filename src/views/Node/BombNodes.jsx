import { Grid } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import BombNode from '../BombNode';
import BombCard from './BombCard';
import LPCard from './LPCard';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/background.jpg';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const TITLE = 'bomb.money | Nodes';


const BombNodes = () => {
  const { path } = useRouteMatch();
  return (
    <Page>
      <BackgroundImage />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
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
