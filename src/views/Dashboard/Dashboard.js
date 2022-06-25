import React, { useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';
import HomeImage from '../../assets/img/background.jpg';
import SummaryCard from './components/SummaryCard';
import BoardroomanAndNews from './components/BoardroomAndNews';
import Farms from './components/Farms';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const TITLE = 'bomb.money | Dashboard';

const Farm = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <Container maxWidth="lg">
            <SummaryCard></SummaryCard>
            <BoardroomanAndNews></BoardroomanAndNews>
            <Farms></Farms>
          </Container>
        </Route>
      </Page>
    </Switch>
  );
};

export default Farm;
