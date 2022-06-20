import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/background.jpg';
import { lotteries, moralisConfiguration } from '../../config';
import moment from 'moment/moment';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const TITLE = 'bomb.money | Nodes Lottery';


const Lottery = () => {
  const { path } = useRouteMatch();
  const [leaderboardData, setLeaderboardData] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    // const params =  { };
    const Moralis = require('moralis/node');
    await Moralis.start({
      serverUrl: moralisConfiguration.serverUrl,
      appId: moralisConfiguration.appId,
    });

    const mappedLoterries = [];
    for (var i = 0; i < lotteries.length; i++) {
      const now = moment();
      let start = moment().day(lotteries[i].periodDays).toDate().toISOString();
      let end = now.toDate().toISOString();
      let limit = 16;

      const events = await Moralis.Cloud.run("eventsLeaderboard", {
        start: start,
        end: end,
        limit: limit,
        table: lotteries[i].table,
      });

      mappedLoterries.push({
        'title': lotteries[i].title + ' Leaderboard',
        'data': events,
      });
    }

    setLeaderboardData(mappedLoterries);
  };

  return (
    <Page>
      <BackgroundImage />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <h1 style={{ fontSize: '80px', textAlign: 'center' }}>LOTTERY</h1>
      <h2 style={{ textAlign: 'center' }}>Leaderboards</h2>
      <p style={{'textAlign': 'center', 'color': '#fff'}}>
        The following leaderboards are based on the number of new nodes created in the past 7 days.
      </p>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {leaderboardData && leaderboardData.map((lottery, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Box style={{ position: 'relative' }}>
                  <Typography variant="h5" component="h2">
                    {lottery.title}
                  </Typography>
                  <table style={{'width': '100%'}}>
                    <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th style={{ textAlign: 'left' }}>Wallet</th>
                      <th>Tickets</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lottery.data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}.</td>
                        <td>{item.objectId}</td>
                        <td style={{ textAlign: 'center' }}>{item.total}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};

export default Lottery;
