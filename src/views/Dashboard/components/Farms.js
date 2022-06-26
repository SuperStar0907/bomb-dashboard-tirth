import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import bombbitcoinLogo from '../../../assets/img/bomb-bitcoin-LP.png';
import bsharebnbLogo from '../../../assets/img/bshare-bnb-LP.png';
import bshares from '../../../assets/img/bshares.png';
import bomb from '../../../assets/img/bomb.png';
import { Typography, Grid } from '@material-ui/core';
import useBanks from '../../../hooks/useBanks';
import FarmCardforDashboard from './FarmCardforDashboard';
const Farms = () => {
    const [banks] = useBanks();
    const activeBanks = banks.filter((bank) => !bank.finished);
    return (

        <StyledCardWrapper style={{
            marginTop: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
            marginBottom: "5px",
            "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #728CDF", "backdropFilter": "blur(10px)", "borderRadius": "10px"
        }}>

            <Grid container spacing={3}>
                <Grid item xs={8} md={8}>
                    <Typography style={{
                        fontFamily: 'Nunito',
                        fontWeight: 700,
                        fontSize: '22px',
                        color: "#FFFFFF",
                        marginLeft: "10px"
                    }} color="#FFFFFF" align="left">
                        Bomb Farms
                    </Typography>
                    <Typography style={{
                        fontFamily: 'Nunito',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: "#FFFFFF",
                        marginLeft: "10px"
                    }} color="#FFFFFF" align="left">
                        Stake your LP tokens in our farms to start earning $BSHARE
                    </Typography>
                </Grid>
                <Grid item xs={4} md={4} align="right">
                    <div style={{ "background": "rgba(35, 40, 75, 0.75)", "border": "1px solid #FFFFFF", "backdropFilter": "blur(10px)", "borderRadius": "10px", width: "40%", marginRight: "20px", marginTop: "15px" }}>
                        <Typography style={{
                            fontFamily: 'Nunito',
                            fontWeight: 400,
                            fontSize: '15px',
                            color: "#FFFFFF",
                        }} color="#FFFFFF" align="center">
                            Claim All <img src={bshares} style={{ "height": "12px" }} />
                        </Typography></div>
                </Grid>
                {activeBanks
                    .filter((bank) => bank.sectionInUI === 3)
                    .map((bank) => (
                        // <p>{bank.depositTokenName}</p>
                        <React.Fragment key={bank.name}>
                            <FarmCardforDashboard bank={bank} />
                        </React.Fragment>
                    ))}
            </Grid>
        </StyledCardWrapper>
    );
};
const StyledCardWrapper = styled.div`
background: rgba(32, 37, 67, 0.5);
margin-bottom: 20px;
border-radius: 5px;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default Farms;

